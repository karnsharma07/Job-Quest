export const fetchJobs = async () => {
  try {
    const response = await fetch("https://remotive.com/api/remote-jobs");
    const data = await response.json();

    return data.jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
