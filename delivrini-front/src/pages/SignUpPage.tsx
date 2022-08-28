import { useEffect, useState } from "react";
import * as Yup from "yup"
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendRegisterAction } from "../store/actions";
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import AuthSocial from "../modules/Auth/AuthSocial";
import { RegisterForm } from "../modules/Auth/register";
// consts
import { paths } from "../utils/enums/routes";


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignUpPage() {
  // selector
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();
  const [role, setRole] = useState('Client');
  const isRegistered = useAppSelector((state) => state.authReducer.isRegistered);
  // const isMailUsed = useAppSelector((state) => state.authReducer.userInfo);
  const dispatch = useAppDispatch();
  // const roles = ["Client", "DeliveryMan", "Chef"];
  // const listRestaurants = useAppSelector((state) => state.RestaurantReducer.restaurantInfo);
  const [restaurant, setRestaurant] = useState<any>("")

  const initialValues: {
    firstName: "";
    lastName: "";
    address: "";
    phone: "";
    zipCode: "";
    street: "";
    email: "";
    password: "";
    // role: ""
  } = {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    zipCode: "",
    street: "",
    email: "",
    password: "",
    // role: ""
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email")
      .required("This field is required!"),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required("This field is required!"),
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    address: Yup.string().required("This field is required!"),
    phone: Yup.string().required("This field is required!"),
  });

  const handleChangeRole = (e: any) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
  }
  const handleChangeRestaurant = (e: any) => {
    const selectedResto = e.target.value;
    setRestaurant(selectedResto)
  }

  const handleRegister = (formValue: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    zipCode: string;
    street: string;
    email: string;
    password: string;
  }) => {
    dispatch<any>(sendRegisterAction({ ...formValue }, role, restaurant))
  }

  useEffect(() => {
    if (isRegistered) {
      navigate(paths.signin);
    }
  }, [isRegistered, navigate]);
  console.log("rest", restaurant);

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to={paths.signin}>
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Manage the job more effectively with Deliverini
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Free forever. No credit card needed.</Typography>

            <AuthSocial />

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to Minimal&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              {''}and{''}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link variant="subtitle2" to={paths.signin} component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}






