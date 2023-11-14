import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  filter: Yup.string()
    .required('Search request is required')
    .min(3, 'Search request must be at least 3 characters')
    .max(100, 'Search request must not exceed 100 characters'),
});
