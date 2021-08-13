// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyCzuB9ECPVb9MgXb_xYQGvFE9Uc6Ww2QCA",
    authDomain: "react-chatsapp.firebaseapp.com",
    projectId: "react-chatsapp",
    storageBucket: "react-chatsapp.appspot.com",
    messagingSenderId: "207601206642",
    appId: "1:207601206642:web:c47c142af8b23f668e49eb",
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
