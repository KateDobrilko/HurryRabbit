import React, {Component} from 'react';
import NavigationBar from './NavigationBar/NavigationBar'
import FlashMessagesList from './Flash/FlashMessagesList';

class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </div>


        )
    }
}

export default App;