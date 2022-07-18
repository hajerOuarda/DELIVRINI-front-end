import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/enums/routes";
import { sendResetPasswordAction } from "../store/actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SnackbarOrigin } from '@mui/material/Snackbar';
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
            <Link color="inherit" href="">
                Delivrini
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();
export interface State extends SnackbarOrigin {
    open: boolean;
}

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.authReducer.userInfo);
    const initialValues: {
        email: "";
    } = {
        email: "",

    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("invalid email")
            .required("This field is required!"),
    });

    const handleResetPassword = (formValue: { email: string }) => {
        dispatch<any>(sendResetPasswordAction(formValue));
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleResetPassword}
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
                                Reset Password
                            </Typography>
                            <Form>
                                <Field
                                    as={TextField}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={errors.email && touched.email}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Submit
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        {userInfo == "Request failed with status code 404" ?
                                            <Alert severity="error" color="error">
                                                No user with this email
                                            </Alert> : userInfo && userInfo.status == "200" ?
                                                <Alert severity="success" color="success">
                                                    1:Check your mailBox or click this link :
                                                    <br />
                                                    <Link href={userInfo.data.check_link}> {userInfo.data.check_link}</Link>
                                                </Alert> : false}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <Link onClick={
                                            () => { navigate(paths.signin) }
                                        }>
                                            {" Reset password done ? Sign in again "}
                                        </Link>
                                    </Grid>
                                </Grid>

                            </Form>
                        </Box>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Container>
                </ThemeProvider>
            )}

        </Formik>

    );
}

