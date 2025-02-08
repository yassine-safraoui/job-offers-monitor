import { Job } from '../../schema';
import { parseCustomDate } from '../helpers';
import { JobProcessor } from './types'
import { JSDOM } from "jsdom";



export const altentProcessor: JobProcessor = async (source) => {
    const request = await fetch(source.url);
    if (!request.ok) {
        throw new Error("Failed to fetch the page");
    }
    const document = new JSDOM(await request.text()).window.document;
    return Array.from(document.getElementsByClassName("is-style-card-default wp-block-webfactory-card"))
        .map((offer): Job | null => {
            let extracted_date = parseCustomDate(offer.querySelector(".card-date")?.textContent?.sanitize())
            if (!extracted_date) return null
            return ({
                url: offer.querySelector("a")?.href ?? "",
                title: offer.querySelector("a")?.textContent?.sanitize() ?? "",
                publishedAt: extracted_date.getTime(),
                sourceId: source.id!,
                location: offer.querySelector(".location-list")?.textContent
                    ?.replaceAll("\n", "").replaceAll("\t", "") ?? ""
            })
        }).filter(e => e != null)
}