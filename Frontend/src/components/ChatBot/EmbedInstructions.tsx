
import React from 'react';
import { Card } from '@/components/ui/card';

const EmbedInstructions = () => {
  const embedCode = `<!-- Copy this entire script tag and paste it before the closing </body> tag of your website -->
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script>
// Paste the EmbeddableChatbot component code here
// Then add this line to render it:
// ReactDOM.render(React.createElement(EmbeddableChatbot), document.body.appendChild(document.createElement('div')));
</script>`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">How to Embed Your Chatbot</h2>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Option 1: React Component (Recommended)</h3>
          <p className="mb-4">If your website uses React, simply copy the <code className="bg-gray-100 px-2 py-1 rounded">EmbeddableChatbot.tsx</code> component and import it:</p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
            <code>{`import EmbeddableChatbot from './EmbeddableChatbot';

function YourWebsite() {
  return (
    <div>
      {/* Your existing content */}
      <EmbeddableChatbot />
    </div>
  );
}`}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Option 2: Vanilla JavaScript</h3>
          <p className="mb-4">For any website, copy the EmbeddableChatbot component code and add it as a script tag:</p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
            <code>{embedCode}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Customization</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Store Information</h4>
              <p className="text-gray-600">Edit the <code className="bg-gray-100 px-2 py-1 rounded">generateBotResponse</code> function to update store hours, location, and policies.</p>
            </div>
            <div>
              <h4 className="font-semibold">Colors & Styling</h4>
              <p className="text-gray-600">Modify the styles object or CSS variables to match your brand colors.</p>
            </div>
            <div>
              <h4 className="font-semibold">Product Categories</h4>
              <p className="text-gray-600">Add more product categories and responses in the bot logic.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-blue-50">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Features Included</h3>
          <ul className="space-y-2 text-blue-700">
            <li>✅ Store hours and location information</li>
            <li>✅ Return and shipping policy responses</li>
            <li>✅ Product category guidance</li>
            <li>✅ Contact information sharing</li>
            <li>✅ Responsive design for all devices</li>
            <li>✅ Smooth animations and transitions</li>
            <li>✅ No external dependencies required</li>
            <li>✅ Completely free to use</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default EmbedInstructions;
