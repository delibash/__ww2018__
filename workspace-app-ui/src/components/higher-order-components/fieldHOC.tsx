// import * as React from 'react';
// import { ComponentType, Component } from 'react';
// import { Fields, Values } from '../../types/utilityTypes';

// export const fieldHOC = <T extends Object>(View: ComponentType<Values<T>>, field: Fields<T>) => (
//     class WithFiled extends Component<Values<T>> {
//         render() {
//             const props = this.props[field];
//             return (
//                 <View {...props}/>
//             );
//         }
//     }
// )