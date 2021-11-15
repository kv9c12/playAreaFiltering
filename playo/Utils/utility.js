exports.paginateResults = (list, pageNumber) => {
    if (list.length > 0) {
        let start = pageNumber <= 1 ? 0 : (pageNumber - 1) * 5;
        let end = 5 + start;
        let venueList = list.slice(start, end);
        return { venueList, pageCount: Math.ceil(list.length / 5) };
    }
    else {
        return { venueList: [], pageCount: 0 }
    }
}