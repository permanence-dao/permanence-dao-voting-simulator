import { Track } from '../data/types';
import { Constants } from './constants';

function insertAtIndex(actual: string, index: number, insert: string): string {
    return actual.substring(0, index) + insert + actual.substring(index);
}

function formatNumber(
    value: bigint,
    decimals: number,
    formatDecimals: number,
    ticker?: string,
): string {
    let formatted = value.toString();
    while (formatted.length < decimals + 1) {
        formatted = '0' + formatted;
    }
    formatted = formatted.substring(0, formatted.length - decimals + formatDecimals);
    let integerPart = formatted.substring(0, formatted.length - formatDecimals);
    for (let i = integerPart.length - 3; i > 0; i -= 3) {
        integerPart = insertAtIndex(integerPart, i, Constants.THOUSANDS_SEPARATOR);
    }

    const decimalPart = formatted.substring(formatted.length - formatDecimals);
    if (decimalPart.length > 0) {
        formatted = `${integerPart}${Constants.DECIMAL_SEPARATOR}${decimalPart}`;
    } else {
        formatted = integerPart;
    }
    if (ticker) {
        return `${formatted} ${ticker}`;
    } else {
        return formatted;
    }
}

function truncate(fullStr: string, strLen = 10, separator = '...', frontChars = 10, backChars = 8) {
    if (fullStr.length <= strLen) return fullStr;
    return (
        fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars)
    );
}

function getTrackShortName(track: Track): string {
    switch (track) {
        case Track.WishForChange:
            return 'WFC';
        case Track.Treasurer:
            return 'TR';
        case Track.FellowshipAdmin:
            return 'FA';
        case Track.SmallTipper:
            return 'ST';
        case Track.BigTipper:
            return 'BT';
        case Track.SmallSpender:
            return 'SS';
        case Track.MediumSpender:
            return 'MS';
        case Track.BigSpender:
            return 'BS';
    }
}

export { formatNumber, truncate, getTrackShortName };
