export type SearchLink = { label: string; url: string };

function google(q: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

export function contactSearchLinks(opts: {
  company: string;
  role?: string;
  location?: string;
}): SearchLink[] {
  const { company, role, location } = opts;
  const links: SearchLink[] = [];

  links.push({
    label: "Recruiters @ " + company,
    url: google(`site:linkedin.com/in/ ("Recruiter" OR "Talent Acquisition") "${company}"`),
  });

  if (role) {
    links.push({
      label: `Hiring manager for ${role}`,
      url: google(`site:linkedin.com/in/ ("${role} Manager" OR "Head of ${role}" OR "Director of ${role}") "${company}"`),
    });
  }

  if (location) {
    links.push({
      label: `${company} people in ${location}`,
      url: google(`site:linkedin.com/in/ "${company}" "${location}"`),
    });
  }

  links.push({ label: `${company} recruiter email`, url: google(`"${company}" recruiter email`) });
  links.push({ label: `${company} on RocketReach`, url: `https://rocketreach.co/search?query=${encodeURIComponent(company)}` });
  links.push({ label: `${company} on Apollo`, url: `https://app.apollo.io/#/searches/people?q=${encodeURIComponent(company)}` });

  return links;
}
