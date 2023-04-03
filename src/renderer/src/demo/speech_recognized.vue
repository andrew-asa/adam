<template>
    <div class="speech-container">
        <div class="search-container">
            <search_pane class="search_type" @search="search"></search_pane>
            <el-icon v-if="!recognizing" class="speech-start op-icon" @click="startRecognition">
                <Microphone></Microphone>
            </el-icon>
            <el-icon v-else class="speech-stop op-icon" @click="stopRecognition">
                <Mute />
            </el-icon>
            <el-icon v-show="hasRecorded" class="op-icon" @click="downloadRecording">
                <Download />
            </el-icon>

            <el-icon class="op-icon" @click="clearRecognizedText"><DeleteFilled /></el-icon>
        </div>
        <!-- <div class="speech-content">
            <HtmlTypeContent class="type-content" :showCursor="showCursor" ref="typeContent" :content="displayText">
            </HtmlTypeContent>
        </div> -->

        <div class="speech-content" ref="speechContent">
            <div class="speech-recognized-text">
                <el-card class="speech-recognized-item" v-for="(text, index) in recognizedTexts" :key="index">
                    <!-- <div slot="header">
                        Recognized Text {{ index + 1 }}
                    </div> -->
                    <div>
                        {{ text }}
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import search_pane from '@renderer/components/lib/search_pane.vue';
import HtmlTypeContent from '@renderer/components/lib/vuetype/HtmlTypeContent.vue';
import { onMounted, ref } from 'vue';
export default {
    props: {

    },
    components: {
        search_pane,
        HtmlTypeContent
    },
    setup(props) {

        const recognizedText = ref('');
        const recognizing = ref(false);
        const hasRecorded = ref(false);
        const recognizedTexts = ref([]);
        return { recognizedText, recognizing, recognizedTexts, hasRecorded };
    },
    methods: {
        clearRecognizedText() {
            this.recognizedTexts=[];
        },
        startRecognition() {
            if (this.recognition && !this.recognizing) {
                console.log("开始录音识别");
                this.recognizing = true;
                this.recognition.start();
            } else {
                console.log("录音设备没有初始化或者正在录音当中");
            }
        },
        stopRecognition() {
            if (this.recognition && this.recognizing) {
                console.log("停止录音识别");
                this.recognition.stop();
            }
        },
        downloadRecording() {
            if (this.recognition) {
                console.log("下载录音");
                const audioContext = new AudioContext()
                const source = audioContext.createMediaStreamSource(this.recognition.stream)
                const destination = audioContext.createMediaStreamDestination()

                source.connect(destination)

                const recorder = new MediaRecorder(destination.stream)
                const chunks = []

                recorder.ondataavailable = (event) => {
                    chunks.push(event.data)
                }

                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/mp3' })
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')

                    link.href = url
                    link.download = 'recording.mp3'
                    link.click()

                    window.URL.revokeObjectURL(url)
                }

                recorder.start()
                setTimeout(() => recorder.stop(), 5000)
            }
        },
        search(text) {
            console.log(text);
        }

    },
    mounted() {

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('浏览器不支持语音识别');
            return;
        }
        console.log('安装录音类');
        this.recognition = ('webkitSpeechRecognition' in window) ? new webkitSpeechRecognition() : new SpeechRecognition();
        // 检查浏览器是否支持 Web Speech API
        this.recognition.continuous = true;
        // 是否返回中间结果
        // this.recognition.interimResults = true;
        this.recognition.lang = 'zh-CN'
        // 监听语音识别事件
        this.recognition.onstart = () => {
            console.log("监听开始录音识别");
        };
        // 监听语音识别结束事件
        this.recognition.onend = () => {
            console.log("监听语音识别结束事件");
            this.recognizing = false;
            // this.recognition = null;
        };
        this.recognition.onerror = (e) => {
            console.log("监听语音识别出错",e);
        };
        this.recognition.onresult = event => {
            let interimTranscript = '';
            let finalTranscript = '';

            // 分离语音数据
            // for (let i = event.resultIndex; i < event.results.length; ++i) {
            //     if (event.results[i].isFinal) {
            //         finalTranscript += event.results[i][0].transcript;
            //     } else {
            //         interimTranscript += event.results[i][0].transcript;
            //     }
            // }
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal)
                    finalTranscript += event.results[i][0].transcript;
            }
            // 更新识别文本
            if (finalTranscript) {
                this.recognizedText = finalTranscript;
            } else {
                this.recognizedText = interimTranscript;
            }
            this.recognizedTexts.unshift(this.recognizedText);
        };

    },
    unmounted() {
        // 卸载语音识别
        if (this.recognition) {
            console.log('卸载录音对象');
            this.recognition.stop();
            this.recognition = null;
        }
    },
}
</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.speech-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}


.type-content {
    width: 600px
}

.search_type {
    display: flex;
    align-items: center;
    justify-content: center;
}

.op-icon {
    font-size: 30px;
}

.op-icon:hover {
    background-color: #eee;
}

.speech-recognized-text {
    width: 600px;
    height: 400px;
    overflow-y: auto;
}
.speech-recognized-text::-webkit-scrollbar {
  width: 8px;
}

.speech-recognized-text::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

.speech-recognized-text::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 20px;
  border: 3px solid #f5f5f5;
}

</style>
  