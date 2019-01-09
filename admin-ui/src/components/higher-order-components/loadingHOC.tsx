import * as React from 'react';
import { ComponentType, Component } from 'react';
import { Loadable, Loading, isLoading, hasErrored, isLoaded, isErrored } from '../../types/utilityTypes';

export interface LoadingProps {
    loadingIndicator?: JSX.Element;
    errorElement?: JSX.Element;
}

export interface LoadingOriginalProps<T> {
    props: Loading<T>;
}

// loading HOC that handles loading a component where each of the components props may be loading
export const loadingByField = <P extends Object>(View: ComponentType<P>) =>
    class WithLoading extends Component<Loadable<P> & LoadingProps> {

        render() {
            const { loadingIndicator, errorElement } = this.props;
            const stillLoading = isLoading(this.props);
            const error = hasErrored(this.props);

            if (error) {
                return errorElement || <div> Error Loading :( </div>;
            }

            if (stillLoading) {
                return loadingIndicator
                    ? <div>{loadingIndicator}</div>
                    : <div> Loading... </div>;
            }

            return <View {...this.props} />;
        }
    };

// loading HOC that handles loading a component whose props are all loaded at once
export const loadingByObject = <P extends Object>(View: ComponentType<P>) =>
    class WithLoading extends Component<LoadingProps & LoadingOriginalProps<P>> {

        render() {
            const { loadingIndicator, errorElement, children, props} = this.props;
            const stillLoading = !isLoaded(props);
            const error = isErrored(props);

            if (error) {
                return errorElement || <div> Error Loading :( </div>;
            }

            if (stillLoading) {
                return loadingIndicator
                    ? <div>{loadingIndicator}</div>
                    : <div> Loading... </div>;
            }

            const loadedProps = props as P;

            return <View {...loadedProps} children={children}/>;
        }
    };
