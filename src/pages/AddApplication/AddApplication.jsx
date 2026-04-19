import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useApplications } from '../../hooks/useApplications';
import './AddApplication.css';

const schema = yup.object().shape({
  company: yup.string().required('Company name is required bro'),
  role: yup.string().required('Role is required, what are you even applying for?'),
  location: yup.string().required('Where is this gig?'),
  salary: yup.number().typeError('Salary must be a number (we want that bag 💰)').positive('Must be positive').integer('No decimals allowed'),
  platform: yup.string().required('Where did you find this?'),
  status: yup.string().required('Status is required'),
  appliedDate: yup.date().required('When did you apply?').typeError('Invalid date'),
  interviewDate: yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr),
  notes: yup.string()
});

export function AddApplication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { applications, addApplication, updateApplication } = useApplications();
  
  const isEditing = Boolean(id);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0], // yyyy-mm-dd
      platform: 'LinkedIn'
    }
  });

  useEffect(() => {
    if (isEditing) {
      const appToEdit = applications.find(a => a.id === id);
      if (appToEdit) {
        reset({
          ...appToEdit,
          appliedDate: appToEdit.appliedDate ? new Date(appToEdit.appliedDate).toISOString().split('T')[0] : '',
          interviewDate: appToEdit.interviewDate ? new Date(appToEdit.interviewDate).toISOString().split('T')[0] : ''
        });
      } else {
        navigate('/applications');
      }
    }
  }, [id, isEditing, applications, reset, navigate]);

  const onSubmit = (data) => {
    // format dates back to ISO
    const formattedData = {
      ...data,
      appliedDate: new Date(data.appliedDate).toISOString(),
      interviewDate: data.interviewDate ? new Date(data.interviewDate).toISOString() : null,
    };

    if (isEditing) {
      updateApplication(id, formattedData);
    } else {
      addApplication(formattedData);
    }
    navigate('/applications');
  };

  return (
    <motion.div 
      className="form-page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="page-header">
        <div>
          <h1>{isEditing ? 'Edit Application' : 'Add New Job'}</h1>
          <p>{isEditing ? 'Update the details below.' : 'Shoot your shot, let\'s track it.'}</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/applications')}>
          Cancel
        </button>
      </div>

      <form className="glass-panel job-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name *</label>
            <input type="text" className={`input-field ${errors.company ? 'error' : ''}`} {...register('company')} placeholder="e.g. Google" />
            {errors.company && <span className="error-msg">{errors.company.message}</span>}
          </div>

          <div className="form-group">
            <label>Role *</label>
            <input type="text" className={`input-field ${errors.role ? 'error' : ''}`} {...register('role')} placeholder="e.g. Frontend Engineer" />
            {errors.role && <span className="error-msg">{errors.role.message}</span>}
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input type="text" className={`input-field ${errors.location ? 'error' : ''}`} {...register('location')} placeholder="e.g. Remote or SF" />
            {errors.location && <span className="error-msg">{errors.location.message}</span>}
          </div>

          <div className="form-group">
            <label>Salary Range (USD) *</label>
            <input type="number" className={`input-field ${errors.salary ? 'error' : ''}`} {...register('salary')} placeholder="e.g. 150000" />
            {errors.salary && <span className="error-msg">{errors.salary.message}</span>}
          </div>

          <div className="form-group">
            <label>Platform *</label>
            <select className="input-field" {...register('platform')}>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Company Site">Company Site</option>
              <option value="Wellfound">Wellfound</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
            {errors.platform && <span className="error-msg">{errors.platform.message}</span>}
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select className="input-field" {...register('status')}>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {errors.status && <span className="error-msg">{errors.status.message}</span>}
          </div>

          <div className="form-group">
            <label>Applied Date *</label>
            <input type="date" className={`input-field ${errors.appliedDate ? 'error' : ''}`} {...register('appliedDate')} />
            {errors.appliedDate && <span className="error-msg">{errors.appliedDate.message}</span>}
          </div>

          <div className="form-group">
            <label>Interview Date (Optional)</label>
            <input type="date" className={`input-field ${errors.interviewDate ? 'error' : ''}`} {...register('interviewDate')} />
            {errors.interviewDate && <span className="error-msg">{errors.interviewDate.message}</span>}
          </div>

          <div className="form-group full-width">
            <label>Notes</label>
            <textarea className="input-field textarea" {...register('notes')} placeholder="Any quirks or things to remember about this role?" rows="4"></textarea>
            {errors.notes && <span className="error-msg">{errors.notes.message}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="sexy-btn">
            {isEditing ? 'Save Changes' : 'Add Application'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
