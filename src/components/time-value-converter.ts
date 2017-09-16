export class TimeValueConverter {
    toView(value: number) {
        return new Date(value * 1000).toLocaleString(); //Multiply UTC to 1000 to get milliseconds, convert to locale
    }
}