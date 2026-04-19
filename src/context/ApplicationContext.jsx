import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const ApplicationContext = createContext();

// default dummy data so it doesnt look empty initially
const initialApps = [
  {
    id: '1',
    company: 'Google',
    role: 'Frontend Engineer',
    location: 'Mountain View, CA',
    salary: 150000,
    platform: 'LinkedIn',
    status: 'Interviewing',
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    interviewDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    notes: 'Recruiter reached out via linkedin. focus on react rendering optimizations.',
    bookmarked: true
  },
  {
    id: '2',
    company: 'Vercel',
    role: 'Developer Advocate',
    location: 'Remote',
    salary: 140000,
    platform: 'Company Site',
    status: 'Applied',
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    interviewDate: null,
    notes: 'love their product, hope i get it!',
    bookmarked: false
  },
  {
    id: '3',
    company: 'Meta',
    role: 'UI Engineer',
    location: 'Menlo Park, CA',
    salary: 160000,
    platform: 'Referral',
    status: 'Rejected',
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    interviewDate: null,
    notes: 'failed the system design round rip',
    bookmarked: false
  },
  {
    id: '4',
    company: 'Stripe',
    role: 'Software Engineer',
    location: 'Remote',
    salary: 170000,
    platform: 'Wellfound',
    status: 'Offer',
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    interviewDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    notes: 'we made it fam 🚀',
    bookmarked: true
  }
];

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useLocalStorage('job-apps', initialApps);

  const addApplication = (appData) => {
    const newApp = {
      ...appData,
      id: uuidv4(),
      bookmarked: false
    };
    setApplications([newApp, ...applications]);
    toast.success('Job application added!');
  };

  const updateApplication = (id, updatedData) => {
    setApplications(applications.map(app => (app.id === id ? { ...app, ...updatedData } : app)));
    toast.success('Application updated successfully');
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
    toast.info('Application trashed 🗑️');
  };

  const toggleBookmark = (id) => {
    setApplications(applications.map(app => (app.id === id ? { ...app, bookmarked: !app.bookmarked } : app)));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      addApplication,
      updateApplication,
      deleteApplication,
      toggleBookmark
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const useApplicationsContext = () => useContext(ApplicationContext);
