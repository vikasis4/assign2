import React from 'react';
import axios from 'axios'

function App() {

  const [session, setSession] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [action, setAction] = React.useState(1);
  const [msg, setmsg] = React.useState('');

  React.useEffect(() => {
    (async function () {
      var res = await fetch('https://proxy-server-uj3w.onrender.com/action' + action);
      var newres = await res.json();
      console.log(newres);
      setSession(newres.data.SessionID)
      setAction(newres.data.NextAction.Action)
    })()
  }, [])

  const runAction = async () => {
    var res = await axios.post('https://proxy-server-uj3w.onrender.com/action' + action, { session, phone })
    console.log(res);
    setmsg(res.data.data.MessageToShow)
  }

  return (
    <div class="main">
      <div class="nav">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <img src={require('./pic3.png')} class="menu-btn" style={{ width: '40px', height: '40px', }} />
          <div class="en">EN &#8595;</div>
        </div>
        <img src={require('./pic2.png')} style={{ marginTop: '20px', width: '50px', height: '50px', }} />
        <div>
          <h4>Step 1/2</h4>
          <div class="bar">
            <div class="mark">
              <div></div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <img src={require('./pic2.png')} style={{ marginTop: '20px', width: '300px', height: '300px', }} />
      <h3>Enter Your Phone Number</h3>

      <div className='input'>
        <h1>Mobile Number</h1>
        <span>91 </span>
        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
        {
          phone ?
            ''
            :
            <span style={{ position: 'absolute', left: '48px', bottom: '16px', fontSize: '24px' }}>_ _ _ _ _ _ _ _ _ _</span>
        }
      </div>

      {
        phone?.length == 10 ?
          <button class="active" onClick={runAction}>Continue</button>
          :
          <button class="inactive">Continue</button>
      }

      <h3 style={{color:'red'}}>{msg}</h3>
      <h4 >
        Entertainment is a subscription service that will automatically renew for 1 USD/ 7 Day(s). You can unsubscribe from the service at anytime, by sending STOP to **** for (operator) . To make use of this service, you must be 18 or more unless you have received permission from your parents or the person who is authorized to pay your bill.
      </h4>
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <a href='https://d3398n96t5wqx9.cloudfront.net/TermsAndConditions/?id=1236&country=Unknown&langcode=en'>Terms & Conditions - </a>
        <a href="https://d3398n96t5wqx9.cloudfront.net/PrivacyPolicy/?id=1236&country=Unknown&langcode=en">&nbsp; Privacy Policy</a>
      </div>
    </div>
  );
}

export default App;
