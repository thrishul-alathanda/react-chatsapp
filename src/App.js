// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "API_KEY_GOES_HERE",
    authDomain: "react-chatsapp.firebaseapp.com",
    projectId: "react-chatsapp",
    storageBucket: "react-chatsapp.appspot.com",
    messagingSenderId: "MSG_SENDER_ID",
    appId: "API_ID-GOES_HERE",
});

const auth = firebase.auth();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading...";
  
  return (
    <div>
      {user ? ('Welcome to the chat') : (<Button onClick={signInWithGoogle}>Sign in with Google</Button>) }
    </div>
  );
}

export default App;
