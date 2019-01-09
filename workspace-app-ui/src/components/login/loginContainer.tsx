import * as React from 'react';
import { Component } from 'react';
import Auth from '../../services/auth/auth';
import { Button } from '../buttons/buttons';
import { Auth0Error } from 'auth0-js';
import { Nullable } from '../../types/utilityTypes';
import * as styles from './login.css';
import * as btnStyles from './../buttons/buttons.css';
import { Logo } from './../svg/svgObj';

type Email = string;

interface Attempt {
    number: number;
    passwords: Set<string>;
    lockedTime: Nullable<string>;
}

interface LoginState {
    email: Email;
    password: string;
    attemptsMap: Map<Email, Attempt>;
}

interface LoginProps {
    state?: string;
}

export default class Login extends Component<LoginProps, LoginState> {
    private auth = new Auth();

    public constructor(props: {}) {
        super(props);
        this.state = {
            email: '',
            password: '',
            attemptsMap: new Map<Email, Attempt>()
        };
    }

    public render() {
        const { email, password, attemptsMap } = this.state;
        const attempt = attemptsMap.get(email) || null;

        // if there is an error attempt for this email mark it as errored if not, active
        const emailClass = email
            ? attempt ? styles.error : styles.active
            : '';

        // if there is an error attempt for this email and password mark as error, if not active
        const passwordClass = password
            ? attempt && attempt.passwords.has(password) ? styles.error : styles.active
            : '';

        // is active if there is a valid email and password
        const buttonClass = emailClass !== '' && passwordClass === styles.active
            ? styles.activeButton : '';

        return (
            <section className={styles.wrapper}>
                <header className={styles.logo}>
                  <h1>
                    <a href="/">
                      <span>Wade &amp; Wendy</span>
                      <Logo />
                    </a>
                  </h1>
                </header>
                <div className={styles.container}>
                    <div>
                        <div className={`${styles.message} ${styles.blueBorder}`}>
                            <span>Welcome to my Workspace! Let’s find you the team members you need. Sign in to see what I’ve been up to.</span>
                        </div>
                        {this.errorMessage(attempt)}
                        {this.finalAttemptMessage(attempt)}
                        {this.lockedMessage(attempt)}
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                          type="email"
                          className={`${styles.input} ${emailClass}`}
                          onChange={this.setEmail}
                          placeholder="Enter your email"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                          className={`${styles.input} ${passwordClass}`}
                          type="password"
                          onChange={this.setPassword}
                          placeholder="Enter your password"
                        />
                        <a href="#" className={styles.help} onClick={() => null}>Forgot your password?</a>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button
                          className={`${btnStyles.btnGray} ${styles.loginBtn} ${buttonClass}`}
                          onClick={this.login}
                          text="Sign In"
                        />
                        <a className={styles.help} href="mailto:help@wadeandwendy.ai">Contact Wade & Wendy Support</a>
                    </div>
                </div>
            </section>
        );
    }

    private errorMessage = (attempt: Nullable<Attempt>) => {
        if (attempt) {
            return (
              <div className={`${styles.message} ${styles.blueRedBorder}`}>
              <span>Uh oh. That email and password combination doesn’t seem to exist. Please re-enter your information.</span>
            </div>
          );
        }
        return <div/>;
    }

    private finalAttemptMessage = (attempt: Nullable<Attempt>) => {
        if (attempt && attempt.number >= 10) {
            return (
              <div className={`${styles.message} ${styles.blueRedBorder}`}>
              <span>If you need to, please click the “Forgot your password” prompt. One more failed attempt will lock your account. Please re-enter your information.</span>
            </div>
          );
        }
        return <div/>;
    }

    private lockedMessage = (attempt: Nullable<Attempt>) => {
        if (attempt && attempt.lockedTime) {
            return (
              <div className={`${styles.message} ${styles.blueRedBorder}`}>
              <span>Sorry, in order to protect your information, I’ve temporarily locked your account. Please enter the email that is associated with your account and my human support team will follow up with you.</span>
            </div>
          );
        }
        return <div/>;
    }

    private unwrapEvent = (event: React.ChangeEvent<HTMLInputElement>): string => {
        return event.target.value;
    }

    private setEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = this.unwrapEvent(event);
        this.setState({email});
    }

    private setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = this.unwrapEvent(event);
        this.setState({password});
    }

    private login = () => {
        const { email, password } = this.state;
        this.auth.login(email, password, this.errorHandler.bind(this, email, password));
    }

    private errorHandler = (email: Email, password: string, {code, description}: Auth0Error) => {

        if (code === 'access_denied' && description === 'Wrong email or password.') {
            const { attemptsMap } = this.state;
            const attempt = attemptsMap.get(email) || {number: 0, passwords: new Set<string>(), lockedTime: null};
            attempt.number += 1;
            attempt.passwords.add(password);

            attemptsMap.set(email, attempt);
            this.setState({attemptsMap});
        }

        if (code === 'too_many_attempts') {
            const { attemptsMap } = this.state;
            const attempt = attemptsMap.get(email) || {number: 0, passwords: new Set<string>(), lockedTime: null};
            attempt.number += 1;
            attempt.passwords.add(password);
            attempt.lockedTime = new Date().toTimeString();

            attemptsMap.set(email, attempt);
            this.setState({attemptsMap});
        }
    }
}
