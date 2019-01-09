import * as React from 'react';
import { Component } from 'react';
import { shallow } from 'enzyme';
import { Loadable } from '../../types/utilityTypes';
import { loadingByField, loadingByObject } from './loadingHOC';

const baseLoading = <div> Loading... </div>;
const baseError = <div> Error Loading :( </div>;

const myLoading = <div> My Loading... </div>;
const myError = <div> My Error </div>;

interface TestProps {
    propOne: number;
    propTwo: number;
    propThree: number;
}

const errorProps: Loadable<TestProps> = {
    propOne: 'error',
    propTwo: 'loading',
    propThree: 3
};

const loadingProps: Loadable<TestProps> = {
    propOne: 1,
    propTwo: 'loading',
    propThree: 3
};

const loadedProps = {
    propOne: 1,
    propTwo: 2,
    propThree: 3
};

const loadedRender = (
    <ul>
        <li>{1}</li>
        <li>{2}</li>
        <li>{3}</li>
    </ul>
);

class TestComponent extends Component<TestProps> {
    render() {
        const { propOne, propTwo, propThree } = this.props;
        return (
            <ul>
                <li>{propOne}</li>
                <li>{propTwo}</li>
                <li>{propThree}</li>
            </ul>
        );
    }
}

const ByFieldTestComp = loadingByField(TestComponent);
const ByObjectTestComp = loadingByObject(TestComponent);

describe('Loading By Field HOC Tests', () => {
    describe('handles errors', () => {
        
        it('renders base error', () => { 
            const output = shallow(<ByFieldTestComp {...errorProps}/>);
            expect(output.contains(baseError)).toEqual(true);
        });

        it('renders custom error', () => {
            const output = shallow(<ByFieldTestComp errorElement={myError} {...errorProps}/>);
            expect(output.contains(myError)).toEqual(true);
        });

    });

    describe('handles loading', () => {
        it('renders base loading', () => {
            const output = shallow(<ByFieldTestComp {...loadingProps}/>);
            expect(output.contains(baseLoading)).toEqual(true);
        });

        it('renders custom loading', () => {
            const output = shallow(<ByFieldTestComp loadingIndicator={myLoading} {...loadingProps}/>);
            expect(output.contains(myLoading)).toEqual(true);
        });
    });

    it('renders component', () => {
        const output = shallow(<ByFieldTestComp {...loadedProps}/>);
        expect(output.dive().equals(loadedRender)).toEqual(true);
    });
});

describe('Loading By Object HOC Tests', () => {
    describe('handles errors', () => {
        
        it('renders base error', () => { 
            const output = shallow(<ByObjectTestComp props={'error'}/>);
            expect(output.contains(baseError)).toEqual(true);
        });

        it('renders custom error', () => {
            const output = shallow(<ByObjectTestComp errorElement={myError} props={'error'}/>);
            expect(output.contains(myError)).toEqual(true);
        });

    });

    describe('handles loading', () => {
        it('renders base loading', () => {
            const output = shallow(<ByObjectTestComp props={'loading'}/>);
            expect(output.contains(baseLoading)).toEqual(true);
        });

        it('renders custom loading', () => {
            const output = shallow(<ByObjectTestComp loadingIndicator={myLoading} props={'loading'}/>);
            expect(output.contains(myLoading)).toEqual(true);
        });
    });

    it('renders component', () => {
        const output = shallow(<ByObjectTestComp props={loadedProps}/>);
        expect(output.dive().equals(loadedRender)).toEqual(true);
    });
});