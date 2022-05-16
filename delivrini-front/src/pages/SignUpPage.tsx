import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/enums/routes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendRegisterAction } from "../store/actions";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Alert } from "@mui/material";



function Copyright(props: any) {

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();


export default function SignUpPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Client');
  const isRegistered = useAppSelector((state) => state.authReducer.isRegistered);
  const isMailUsed = useAppSelector((state) => state.authReducer.userInfo);
  const dispatch = useAppDispatch();
  const roles = ["Client", "DeliveryMan", "Chef"];



  const initialValues: {
    firstName: "";
    lastName: "";
    address: "";
    phone: "";
    zipCode: "";
    street: "";
    email: "";
    password: "";
    role: ""
  } = {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    zipCode: "",
    street: "",
    email: "",
    password: "",
    role: ""
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

  const handleChange = (e: any) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
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
    dispatch<any>(sendRegisterAction({ ...formValue }, role))
  }

  useEffect(() => {
    if (isRegistered) {
      navigate(paths.signin);
    }
  }, [isRegistered, navigate]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ errors, touched }) => (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Form >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      error={errors.firstName && touched.firstName}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="alert alert-danger"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      error={errors.lastName && touched.lastName}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="alert alert-danger"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="phone"
                      label="Phone"
                      name="phone"
                      autoComplete="phone"
                      error={errors.phone && touched.phone}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="alert alert-danger"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="zipCode"
                      label="Zip Code"
                      name="zipCode"
                      autoComplete="zipCode"
                      error={errors.zipCode && touched.zipCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="address"
                      label="address"
                      name="address"
                      autoComplete="address"
                      error={errors.address && touched.address}
                    />
                    <ErrorMessage
                      name="adsress"
                      component="div"
                      className="alert alert-danger"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="street"
                      label="Street"
                      name="street"
                      autoComplete="street"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      error={errors.email && touched.email}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={errors.password && touched.password}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="role"
                      required
                      name="role"
                      label="Role"
                      autoWidth
                      displayEmpty
                      onChange={handleChange
                      }
                      value={role}
                    >
                      {roles.map((role, index) => (
                        <MenuItem value={role} key={index}> {role}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={
                      () => { navigate(paths.signin) }
                    }>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    {isMailUsed === "409" ?
                      <Alert severity="error" color="error">
                        Email already used !
                      </Alert> : false}
                  </Grid>
                </Grid>
              </Form>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>

        </ThemeProvider>
      )}
    </Formik>
  )
}






