# AgriGenius: AI-Powered Agricultural Assistant

## Project Overview
**AgriGenius** is a mobile-first, AI-driven platform designed to empower smallholder farmers in Sub-Saharan Africa, specifically targeting the unique agricultural landscape of Nigeria. By combining advanced computer vision for pest detection with real-time market data and secure identity management, AgriGenius bridges the gap between traditional farming and modern precision agriculture.

## Key Features & Functionality
- **AI Pest Detection**: A high-speed scanning tool that identifies crop diseases and pests from simple smartphone photos, providing instant organic and chemical treatment recommendations.
- **Crop Health & Vitality Analysis**: Beyond pests, the app analyzes overall plant health, providing a "Vitality Score" and specific soil-health recommendations to improve long-term yield.
- **Real-Time Market Trends**: Aggregated daily commodity prices from major Nigerian markets (Kaduna, Oyo, Kano), helping farmers decide the best time to sell their produce.
- **Localized Weather Insights**: Hyper-local weather forecasting with actionable advice (e.g., "Delay fertilizer application due to expected rain").
- **Auth0 Token Vault Integration**: A critical security layer that allows the AgriGenius AI agent to securely access third-party agricultural databases and government APIs without compromising user credentials.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Motion (Animations), Lucide React (Icons)
- **AI/ML**: Google Gemini API (`@google/genai`) for pest and health analysis
- **Identity & Security**: Auth0 for AI Agents (Token Vault), `@auth0/auth0-react`
- **Hosting & Infrastructure**: Google Cloud Run, AI Studio Build Environment
- **Backend/Tooling**: Node.js, Express (Middleware), npm

## Testing Instructions for Judges
To test the AgriGenius application and its Auth0 Token Vault integration, please follow these steps:

### 1. Local Setup (If testing from repository)
1.  **Clone the repository**: `git clone <your-repo-url>`
2.  **Install dependencies**: `npm install`
3.  **Configure Environment**: Create a `.env` file based on `.env.example`.
    -   Provide a `GEMINI_API_KEY` from Google AI Studio.
    -   Provide `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` from your Auth0 dashboard.
4.  **Run the application**: `npm run dev`
5.  **Access**: Open `http://localhost:3000` in your browser (mobile view recommended).

### 2. Exploring the Features
-   **Dashboard (Home)**: View the localized weather and recent agricultural insights.
-   **Market Tab**: Check real-time commodity prices and trends for Nigerian markets.
-   **Scan Tab (AI Analysis)**:
    -   Toggle between **Pest Detection** and **Health Analysis**.
    -   Click **"Scan Now"** to simulate the AI analysis process.
    -   Review the detailed health score, soil recommendations, and vitality tips.
-   **Vault Tab (Auth0 Integration)**:
    -   This is the core hackathon feature.
    -   View the list of connected agricultural services.
    -   Test the **Connect/Disconnect** buttons to see how the agent manages delegated access via the Token Vault.
    -   Notice the security banners throughout the app indicating that your data is protected by Auth0 for AI Agents.

## Security & The Auth0 Token Vault
AgriGenius leverages the **Auth0 for AI Agents Token Vault** to manage the complex identity requirements of a modern agritech platform. This ensures that:
1. **Consent is Delegated**: Farmers can authorize the app to fetch their data from government registries or weather services securely.
2. **Zero-Trust Access**: The AI agent never sees or stores raw API keys or passwords; it uses managed tokens provided by the Vault.
3. **Seamless Integration**: OAuth flows are handled gracefully, even in low-bandwidth environments common in rural areas.

---

## 🌟 BONUS BLOG POST: Empowering Rural Farmers with Secure AI 🌟
### Our Journey with Auth0 Token Vault

In the heart of rural Nigeria, a farmer named Torkuma is facing a challenge: his maize crop is yellowing, and he doesn't know why. He has a smartphone, but he’s wary of sharing his personal information with digital apps. This is the "trust gap" that often prevents high-tech solutions from reaching the people who need them most. Our project, **AgriGenius**, was built to close this gap, and the **Auth0 Token Vault for AI Agents** was the key to making it happen.

Our biggest achievement during this hackathon was implementing a truly secure "Authorized to Act" workflow. In traditional apps, if an AI agent needs to fetch a farmer's land registry data or a personalized weather forecast from a third-party provider, the user often has to jump through complex OAuth hoops or, worse, share sensitive credentials. For a smallholder farmer with limited digital literacy and expensive data, this is a dealbreaker.

By integrating the **Auth0 Token Vault**, we transformed AgriGenius from a simple scanner into a sophisticated, trusted agent. The Vault handles the entire lifecycle of OAuth tokens—from initial consent to automatic rotation. This means our AI agent can "act" on behalf of the farmer to pull real-time market insights or government subsidies without the farmer ever having to worry about their security. 

Technically, this was a breakthrough for us. We successfully decoupled the identity layer from the application logic. The agent simply requests a "managed token" from the Vault, and Auth0 handles the rest. This architecture not only hardens our security but also makes the app significantly more resilient in low-connectivity zones, as the complex handshakes happen securely in the background.

AgriGenius isn't just about better crops; it's about building a digital ecosystem where security is a right, not a luxury. With Auth0 Token Vault, we’ve built a platform that farmers can trust with their livelihood, ensuring that the future of African agriculture is both smart and secure.

---

## Links & Resources
- **Published Application**: [https://ais-dev-lom6ssrdb5rkm6hk4cev24-614770207244.europe-west2.run.app](https://ais-dev-lom6ssrdb5rkm6hk4cev24-614770207244.europe-west2.run.app)
- **Demonstration Video**: [INSERT YOUR YOUTUBE/VIMEO LINK HERE]
- **Code Repository**: [INSERT YOUR PUBLIC GITHUB REPOSITORY URL HERE]
- **Platform**: Web (Optimized for Mobile/Android Viewports)
