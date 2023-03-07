import moment from 'moment';

export const filterJobs = (filter, jobs) => {
  let filteredList = [...jobs];

  // Filter jobType
  if (filter.jobType !== 'all') {
    const filtered = filteredList.filter((job) => filter.jobType.includes(job.jobType));

    filteredList = filtered;
  }

  // Search
  if (filter.search !== '') {
    const searchList = [];
    const searchTerm = filter.search.toLowerCase();

    for (let i = 0; i < filteredList.length; i++) {
      if (
        (filteredList[i].companyName !== null &&
          filteredList[i].companyName.toLowerCase().includes(searchTerm)) ||
        (filteredList[i].jobTitle !== null &&
          filteredList[i].jobTitle.toLowerCase().includes(searchTerm))
      ) {
        searchList.push(filteredList[i]);
      }
    }
    filteredList = searchList;
  }

  return filteredList;
};

export const orderJobs = (order, jobs) => {
  const orderedList = [...jobs];

  if (order === 'createdAt') {
    orderedList.sort((a, b) => {
      const unixA = moment.unix(a.createdAt.seconds);
      const unixB = moment.unix(b.createdAt.seconds);

      return unixA > unixB ? -1 : 1;
    });
  } else {
    orderedList.sort((a, b) => {
      const nameA = a[order] ? a[order].toLowerCase() : 'zzz';
      const nameB = b[order] ? b[order].toLowerCase() : 'zzz';

      return nameA < nameB ? -1 : 1;
    });
  }

  return orderedList;
};
