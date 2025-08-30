# EngageAI: AI-Powered Content Analyzer

EngageAI is a web application designed to help content creators, social media managers, and marketers enhance their written content. By uploading a document (PDF or image), users can leverage the power of generative AI to receive actionable suggestions for improving clarity, sentiment, and calls to action, ultimately boosting engagement.

![EngageAI Screenshot]()
![EngageAI Screenshot]()


## ✨ Features

-   **File Upload:** Easily upload your content in PDF or various image formats (.png, .jpg, .jpeg, .webp).
-   **AI-Powered Text Extraction:** Automatically extracts text from your documents using advanced OCR and document parsing.
-   **Content Analysis:** The application analyzes the extracted text and provides suggestions in three key areas:
    -   **Clarity:** Improve readability and make your message easier to understand.
    -   **Sentiment:** Adjust the emotional tone of your content.
    -   **Call to Action:** Strengthen your prompts to encourage user interaction.
-   **Side-by-Side Comparison:** View your original text and the AI's suggestions in a clear, side-by-side layout.
-   **Responsive Design:** A clean, modern, and fully responsive user interface built with ShadCN UI and Tailwind CSS.

## 🚀 Deployment

The live application is deployed on Vercel and you can access it here:

[**EngageAI Live**](https://social-media-content-analyzer-alpha.vercel.app/)

## 🛠️ Tech Stack

This project is built with a modern, full-stack TypeScript setup:

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **AI/Generative:** [Genkit](https://firebase.google.com/docs/genkit) with Google's [Gemini](https://ai.google.dev/) models
-   **UI:** [React](https://react.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
-   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **Deployment:** [Vercel](https://vercel.com/)
-   **Hosting:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) (for Genkit backend)

## 📄 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v20 or later)
-   `npm`, `yarn`, or `pnpm`

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/engage-ai.git
    cd engage-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Google AI API key.
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```
    You can obtain an API key from the [Google AI Studio](https://aistudio.google.com/).

4.  **Run the development server:**
    The application runs on two separate processes: the Next.js frontend and the Genkit AI flows.

    -   **Start the Next.js app:**
        ```bash
        npm run dev
        ```
        This will start the frontend on [http://localhost:9002](http://localhost:9002).

    -   **Start the Genkit development server:**
        In a separate terminal, run:
        ```bash
        npm run genkit:dev
        ```
        This starts the Genkit developer UI on [http://localhost:4000](http://localhost:4000) and makes the AI flows available to the frontend.

## 💡 How to Use

1.  Navigate to the deployed app or your local instance ([http://localhost:9002](http://localhost:9002)).
2.  Drag and drop a file into the upload area, or click "Or browse files" to select a document from your computer.
3.  The application will automatically extract the text and analyze it.
4.  Once the analysis is complete, you will see your original content on the left and the AI-generated suggestions for clarity, sentiment, and call to action on the right.
5.  Click "Analyze Another Document" to start over.
