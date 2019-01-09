import * as React from 'react';
import { ComponentType, Component } from 'react';
import { Nullified, isNotNull } from '../../types/utilityTypes';

interface NullableProps {
    nullIndicator?: JSX.Element;
}

export const nullableHOC = <P extends Object>(View: ComponentType<P>) => (
    class WithNullable extends Component<Nullified<P> & NullableProps> {

        render() {
            const notNull = isNotNull(this.props);

            if (notNull) {
                return <View {...this.props} />;
            } else {
                return this.props.nullIndicator || <div/>; 
            }
        }
    }
);