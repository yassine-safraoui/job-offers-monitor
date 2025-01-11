import { Job } from '../../schema';
import { JobProcessor } from './types'
import { JSDOM } from "jsdom";

declare global {
    interface String {
        sanitize(): string;
    }
}

String.prototype.sanitize = function (): string {
    return this.replaceAll("\n", "").replaceAll("\t", "").trim();
};

export const altentProcessor: JobProcessor = async (source) => {
    const request = await fetch(source.url);
    if (!request.ok) {
        throw new Error("Failed to fetch the page");
    }
    const document = new JSDOM(await request.text()).window.document;
    return Array.from(document.getElementsByClassName("is-style-card-default wp-block-webfactory-card"))
        .map(offer => ({
            url: offer.querySelector("a")?.href ?? "",
            title: offer.querySelector("a")?.textContent?.sanitize() ?? "",
            publishedAt: new Date(offer.querySelector(".card-date")?.textContent?.sanitize() ?? "").getTime(),
            sourceId: source.id!,
            location: offer.querySelector(".location-list")?.textContent
                ?.replaceAll("\n", "").replaceAll("\t", "") ?? ""
        } satisfies Job))
}