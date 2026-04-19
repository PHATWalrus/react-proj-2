import { useApplicationsContext } from '../context/ApplicationContext';

// just a neat little wrapper hook so we dont have to import both useContext and ApplicationContext everywhere
export function useApplications() {
  const context = useApplicationsContext();
  if (!context) {
    throw new Error('bro you forgot to wrap the app in ApplicationProvider 🤦‍♂️');
  }
  return context;
}
