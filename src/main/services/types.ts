export interface ServicesProvider {
    getProviders(): { [key: string]: Function }
}