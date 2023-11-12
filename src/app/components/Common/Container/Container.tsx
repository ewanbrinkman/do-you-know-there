import React from 'react';
import ContainerProps from '@typings/common/container/ContainerProps';

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
    return (
        <div
            className={`bg-secondary-color rounded-lg flex flex-col items-center text-primary-color p-4 text-center space-y-4 ${props.className}`}
            style={props.style}
        >
            {props.children}
        </div>
    );
};

export default Container;
