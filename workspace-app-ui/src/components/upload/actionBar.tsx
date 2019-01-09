import * as React from 'react';
import { Component } from 'react';
import { SVG } from './../svg/svgs';
import { Link } from 'react-router-dom';
import { Button } from './../buttons/buttons';
import { Route } from 'react-router-dom';
import Dropdown from './../dropdown/dropdownComponent';
import * as btnStyles from './../buttons/buttons.css';
import * as svgStyles from './../svg/index.css';
import * as styles from './upload.css';
import * as dropdown from './../dropdown/dropdown.css';

interface ActionBarProps {}

class UploadActionBar extends Component<ActionBarProps> {
  public state = {};

  public render () {
    return (
      <aside className={styles.aside}>
        <div className={styles.fixed}>
          <section style={{textAlign: 'center'}}>
            <Link to={{pathname: '/dashboard/all'}}>
              <SVG
                className={svgStyles.actionBarIcon}
                viewBox="0 0 23 24"
                path="M22.72 10.12a7.53 7.53 0 0 0-3.58-4.54 7.62 7.62 0 0 0-4.43-.94 7.57 7.57 0 1 0-13.17 7.27A7.63 7.63 0 0 0 .15 15a7.42 7.42 0 0 0 1.11 5.65 7.54 7.54 0 0 0 4.82 3.23A7.83 7.83 0 0 0 7.6 24a7.59 7.59 0 0 0 6.88-4.39 7 7 0 0 0 .92.06 7.63 7.63 0 0 0 6.6-3.83 7.47 7.47 0 0 0 .7-5.72M7.71 1.8a5.76 5.76 0 0 1 5.78 5.73 5.67 5.67 0 0 1-1 3.18A7.47 7.47 0 0 0 8.21 9a7.53 7.53 0 0 0-4.81 1.19c-.19.13-.38.26-.56.4a5.7 5.7 0 0 1-.9-3.06A5.76 5.76 0 0 1 7.71 1.8m3.06 19.45a5.81 5.81 0 0 1-8-1.62 5.71 5.71 0 0 1 1.63-7.94 5.72 5.72 0 0 1 3.45-.94A8.58 8.58 0 0 0 8.4 15c.12.3.21.48.21.48a7.38 7.38 0 0 0 3 3.17 7 7 0 0 0 1 .47 5.72 5.72 0 0 1-1.91 2.09M20.44 15A5.71 5.71 0 0 1 17 17.66a5.8 5.8 0 0 1-4.39-.53 5.71 5.71 0 0 1-2.35-2.49 7.42 7.42 0 0 0 3.45-2.45l.09-.12a7.39 7.39 0 0 0 1.5-4.54 7 7 0 0 0-.09-1.12 6 6 0 0 1 3 .73A5.71 5.71 0 0 1 21 10.6a5.61 5.61 0 0 1-.56 4.4"
              />
            </Link>
          </section>
          <section>
            <Route
              path="/upload"
              render={props => (
                <Dropdown
                  overwriteStyles={dropdown.wrapperTransparent}
                  options={[
                    { name: 'Submit New Role', value: 0 },
                  ]}
                />
              )}
            />
          </section>
          <section>
            <Button
              className={btnStyles.transparent}
              text="Cancel"
              onClick={() => null}
            />
          </section>
        </div>
      </aside>
    );
  }
}

export default UploadActionBar;
