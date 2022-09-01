import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { sendRegisterAction } from '../../../store/actions';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMountedRef = useIsMountedRef();

  const [role, setRole] = useState('Client');
  // const isMailUsed = useAppSelector((state) => state.authReducer.userInfo);
  const AVAILABLE_ROLES = ["Client", "DeliveryMan", "Chef"];
  const RESTAURANT_LIST = useAppSelector((state) => state.RestaurantReducer.restaurantInfo);
  const [restaurant, setRestaurant] = useState();
  const isRegistered = useAppSelector((state) => state.authReducer.isRegistered);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Password is required'),
    address: Yup.string().required("This field is required!"),
    phone: Yup.string().required("This field is required!"),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    zipCode: '',
    street: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (formValue) => {
    // check for chef
    if ("Chef" === role && !restaurant) {
      setError('afterSubmit', { message: 'Select restaurant' });
      return;
    }

    try {
      const result = await dispatch(sendRegisterAction({ ...formValue }, role, restaurant));
      if (isRegistered || result) {
        navigate('/', { replace: true });
      } else {
        if (isMountedRef.current) {
          setError('afterSubmit', { message: 'Check your data' });
        }
      }
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const handleChangeRole = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
  }
  const handleChangeRestaurant = (e) => {
    const selectedResto = e.target.value;
    setRestaurant(selectedResto)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" autoComplete="given-name" />
          <RHFTextField name="lastName" label="Last name" autoComplete="family-name" />
        </Stack>

        <RHFTextField name="email" label="Email address" autoComplete="email" />

        <RHFTextField
          name="password"
          label="Password"
          autoComplete="new-password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField name="address" label="Address" autoComplete="address" />
        <RHFTextField name="phone" label="Phone" autoComplete="phone" />

        <RHFSelect
          name="role"
          label="Role"
          onChange={handleChangeRole}
        >
          {AVAILABLE_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </RHFSelect>
        {role === "Chef" && (<RHFSelect
          name="restaurant"
          label="Restaurant"
          onChange={handleChangeRestaurant}>
          <option></option>
          {RESTAURANT_LIST.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.name}>
              {restaurant.name}
            </option>
          ))}
        </RHFSelect>)}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
