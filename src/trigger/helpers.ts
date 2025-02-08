declare global {
    interface String {
        sanitize(): string;
    }
}

String.prototype.sanitize = function (): string {
    return this.replaceAll("\n", "").replaceAll("\t", "").trim();
};

export function parseCustomDate(dateString, format = "DD/MM/YYYY") {
    const formatParts = format.split(/[-/]/); // Split format into parts
    const dateParts = dateString.split(/[-/]/); // Split actual date string

    let day, month, year;

    formatParts.forEach((part, index) => {
        if (part === "DD") day = parseInt(dateParts[index], 10);
        else if (part === "MM") month = parseInt(dateParts[index], 10) - 1; // Month is 0-based
        else if (part === "YYYY") year = parseInt(dateParts[index], 10);
    });

    return new Date(year, month, day);
}