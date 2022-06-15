import logo from './logo.svg';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import { useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import Amplify, { Auth,PubSub } from 'aws-amplify';
import awsconfig from './aws-exports';




function App() {
  
useEffect(()=>{
  PubSub.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'us-east-2',
    aws_pubsub_endpoint: 'wss://al3qi2b1mxp67-ats.iot.us-east-2.amazonaws.com/mqtt',
}));
    console.log('called')
    let subscription  =PubSub.subscribe('bug').subscribe({
        next: data => console.log('Message received', data),
        error: error => console.error(error),
        complete: () => console.log('Done'),
    });
    return () => {

        subscription.unsubscribe('bug')
      } 
},[])

  
  return (
    <Authenticator>
    {({ signOut, user }) => (
      <main>
       
        <button onClick={signOut}>Sign out</button>
      </main>
    )}
  </Authenticator>
  );
}

export default App;
