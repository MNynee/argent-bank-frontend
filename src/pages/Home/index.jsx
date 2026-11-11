import Banner from '../../components/Banner'
import iconChat from '../../assets/icon-chat.webp'
import iconMoney from '../../assets/icon-money.webp'
import iconSecurity from '../../assets/icon-security.webp'
import Feature from '../../components/Feature'
import './Home.css'

const Home = () => {
  return (
    <div className='page'>
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <Feature src={iconChat} alt="Chat Icon" title="You are our #1 priority" description="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes."/>
        <Feature src={iconMoney} alt="Money Icon" title="More savings means higher rates" description="The more you save with us, the higher your interest rate will be!"/>
        <Feature src={iconSecurity} alt="Security Icon" title="Security you can trust" description="We use top of the line encryption to make sure your data and money
            is always safe."/>
      </section>
    </div>
  )
}

export default Home