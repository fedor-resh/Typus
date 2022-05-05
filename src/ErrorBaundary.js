import Error from './Components/Error/Error';
import React from 'react'
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.error('!error!: ',error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <Error
                        subtitle={'reload page please'}
                        massage={'something wrong'}
                    />
                </>
            );
        }
        return this.props.children;
    }
}