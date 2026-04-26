import { FaTag, FaSearchengin, FaListUl } from 'react-icons/fa6'
import { IoGridOutline } from 'react-icons/io5'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DetailsModal from './DetailsModal'
import { StockCardProps } from '../types'



const card = [
  {
    type: ' STOCK / TECH',
    label: 'Bitcoin',
    return: '+8.5%',
    risk: 'Medium',
    image: "/assets/images/imgB.jpg",
    symbol: 'BTC-USD',
    financial:
      'Bitcoin (BTC) is a cryptocurrency launched in 2010. Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 19,950,600. The last known price of Bitcoin is 82,420.12720958 USD and is down -9.88 over the last 24 hours. It is currently trading on 12483 active market(s) with $116,350,374,824.36 traded',
    about:
      'Bitcoin under Mark Investment Co-Operation is strategically managed as a digital asset portfolio designed for long-term growth. Mark Investment oversees the acquisition and distribution of Bitcoin shares, allowing investors to participate indirectly through our structured investment model',
    stats: {
      ceo: 'Tesla Investment',
      more: 'Amounts are as of December 31, 2024 and compensation values are for the last fiscal year ending on that date. Pay is salary, bonuses, etc. Exercised is the value of options exercised during the fiscal year. Currency in USD.',
      hq: 'Tesla Investment',
      industry: 'cryptocurrency',
      founded: 'July 2010',
    },
    
  },

  {
    type: ' STOCK / TECH',
    label: 'Tesla stock ',
    return: '+20.5%',
    risk: 'Low',
    image: "/assets/images/imT.jpg",
    symbol: 'TSLA',
    financial:
      "Tesla Inc's financial performance in FY 2025 Q3 shows a concerning decline in profitability and revenue growth, with EPS growth declining by 64.02% and revenue growth at -1.56%. Efficiency metrics like inventory turnover improved to 5.92, but asset turnover weakened to 0.75. Despite these challenges, free cash flow growth surged by 540.61%, indicating strong cash generation capabilities amidst declining sales.",
    stats: {
      ceo: 'Mr. Elon R. Musk',
      more: 'Amounts are as of December 31, 2024 and compensation values are for the last fiscal year ending on that date. Pay is salary, bonuses, etc. Exercised is the value of options exercised during the fiscal year. Currency in USD.',
      industry: 'Auto Manufacturers',
      hq: '1 Tesla RoadAustin, TX 78725 United States',
      founded: 'July 2003',
    },
    about:
      'Tesla under Tesla Investment Co-Operation is strategically managed as a digital asset portfolio designed for long-term growth. Tesla Investment oversees the acquisition and distribution of Tesla shares, allowing investors to participate indirectly through our structured investment model',
  },

  {
    type: ' STOCK / TECH',
    label: 'SpaceX stock ',
    symbol: 'SPAX.PVT',
    return: '+40.5%',
    risk: 'Low',
    image: "/assets/images/imS.jpg",
    about:
      "SpaceX designs, manufactures and launches rockets and spacecraft. The company has developed a fleet of reusable rockets including Falcon 9 which SpaceX claims is the first orbital class rocket capable of re-flight and Falcon Heavy, its super heavy lift rocket. SpaceX's mission is to create fully reusable launch vehicles capable of carrying humans to Mars and other destinations in the solar system. Additionally, SpaceX has developed StarLink, a satellite internet service created with thousands of small satellites in low Earth orbit.",
    financial:
      "Strong Financial Performance and Investor Confidence: SpaceX has reportedly become one of the highest-valued private companies in the world with a recorded valuation of $400 billion in July 2025. This valuation was reported when the company was said to be preparing to purchase as much as $1 billion in common stock in a share buyback, demonstrating the strength of the company's financial position. SpaceX's potential dominance in the space industry and U.S. satellite launch market has been driven by its flagship Falcon rockets, as rivals have struggled to field operational rockets to compete. Additionally, the company is expected to grow its sales more than 50% to $13.3 billion in 2025 with earnings expected to grow by 50% to $4.5 billion.",
    stats: {
      ceo: 'Mr. Elon R. Musk',
      more: 'Amounts are as of December 31, 2024 and compensation values are for the last fiscal year ending on that date. Pay is salary, bonuses, etc. Exercised is the value of options exercised during the fiscal year. Currency in USD.',
      industry: 'Advanced Materials, Aerospace, Manufacturing, National Security, Space Travel',
      hq: 'Hawthorne, CA US',
      founded: 'March 2002',
    },
  },

  {
    type: 'ETF',
    label: 'Renewable',
    return: '+40.5%',
    risk: 'High',
    image: "/assets/images/imE.jpg",
    symbol: 'TTE',
    about:
      'Renewable Energy under Tesla Investment Co-Operation is strategically managed as a digital asset portfolio designed for long-term growth. Tesla Investment oversees the acquisition and distribution of Renewable shares, allowing investors to participate indirectly through our structured investment model',

    stats: {
      ceo: 'Tesla Investment',
      more: 'Amounts are as of December 31, 2024 and compensation values are for the last fiscal year ending on that date. Pay is salary, bonuses, etc. Exercised is the value of options exercised during the fiscal year. Currency in USD.',
      industry: 'Oil & Gas Integrated',
      hq: 'Tour Coupole - 2Place Jean Millier Paris la Défense cedexCourbevoie 92078 France',
      founded: 'July 2003',
    },
  },
]



const StockCard = (item: StockCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleDetailsToggle() {
    setIsOpen((prev: boolean) => !prev)

   }
  return (
    <div className="flex flex-col bg-[#0a0a0a] text-white selection:bg-white/10 rounded-3xl overflow-hidden premium-card group shadow-md shadow-gray-900">
      {/* Image */}
      <div
        className="h-60 bg-center bg-cover"
        data-netlify-image-url={`/.netlify/images?url=${item.image}&w=400&fm=webp`}
        style={{
          backgroundImage: `url(${import.meta.env.DEV ? item.image : `/.netlify/images?url=${item.image}&w=400&fm=webp`})`
        }}
      />


      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <p className="premium-label mb-1">{item.type}</p>
          <h3 className="font-bold text-xl text-white tracking-tighter">{item.label}</h3>
        </div>

        <div className="flex justify-between text-sm text-gray-300">
          <p>Est. Return</p>
          <p className="font-bold text-green-500">{item.return}</p>
        </div>

        <div className="flex justify-between text-sm text-gray-300">
          <p>Risk Level</p>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.risk === 'Low'
                ? 'bg-green-600 text-green-100'
                : item.risk === 'Medium'
                  ? 'bg-yellow-300 text-yellow-700'
                  : 'bg-red-800/70 text-red-300'
              }`}>
            {item.risk}
          </span>
        </div>

        <button onClick={handleDetailsToggle} className="w-full h-12 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest mt-auto hover:bg-slate-200 transition-all active:scale-[0.98]">
          View Details
        </button>
        {
          isOpen && <DetailsModal onClose={handleDetailsToggle} item={item} />
        }
      </div>
    </div>
  )
}

const DiscoverPage = () => {

  const navigate = useNavigate()



  return (
    <div id="discover" className="font-display min-h-screen flex flex-col w-full mx-auto px-6 lg:px-8 max-w-7xl pt-32 pb-20">
      {/* Top Navbar */}

      {/* Main */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Main content */}
          <div className="flex-1 flex flex-col gap-6 px-4 md:px-0 ">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tighter mb-4">Discover Opportunities</h2>
                <p className="text-slate-500 text-lg font-medium max-w-2xl">
                  Explore high-growth assets and curated portfolios managed by top-tier investment strategies.
                </p>
              </div>
              {/* <button
                onClick={()=>navigate('/')}
                className="text-white hover:text-emerald-400 transition-colors font-semibold text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg"
              >
                ← Back to Home
              </button> */}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
              {card.map((item, index) => (
                <div key={index}>
                  <StockCard
                    type={item.type}
                    return={item.return}
                    label={item.label}
                    image={item.image}
                    risk={item.risk}
                    symbol={item.symbol}
                    financial={item.financial}
                    stats={item.stats}
                    about={item.about}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DiscoverPage
