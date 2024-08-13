import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Mentalhealth = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Mental Health Awareness
        </h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Understanding Mental Health
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also influences how we handle stress, relate to others, and make choices.
          </p>
          <img 
            src="https://whws.org.au/wp-content/uploads/2021/12/get-on-top-of-mental-health-early.jpg" 
            alt="Mental Health" 
            className="w-full h-auto mb-4 rounded-lg shadow-lg" 
          />
          <p className="text-lg text-gray-600">
            Good mental health is more than just the absence of mental illness. It means you are in a state of well-being where you feel good, function well, and are able to contribute positively to your community.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Common Mental Health Issues
          </h2>
          <ul className="list-disc list-inside mb-4 text-gray-600">
            <li>Depression</li>
            <li>Anxiety Disorders</li>
            <li>Obsessive-Compulsive Disorder (OCD)</li>
            <li>Post-Traumatic Stress Disorder (PTSD)</li>
          </ul>
          <img 
            src="https://example.com/common-issues.jpg" 
            alt="Common Mental Health Issues" 
            className="w-full h-auto mb-4 rounded-lg shadow-lg" 
          />
          <p className="text-lg text-gray-600">
            Mental health issues are common and can affect anyone. It’s important to recognize the signs and seek help when needed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Tips for Maintaining Mental Health
          </h2>
          <ol className="list-decimal list-inside mb-4 text-gray-600">
            <li>Stay Active: Exercise regularly to help reduce stress and improve mood.</li>
            <li>Connect with Others: Maintain social connections with friends and family.</li>
            <li>Practice Mindfulness: Engage in mindfulness practices such as meditation.</li>
            <li>Seek Professional Help: Don’t hesitate to contact a mental health professional if needed.</li>
          </ol>
          <img 
            src="https://example.com/tips.jpg" 
            alt="Tips for Mental Health" 
            className="w-full h-auto mb-4 rounded-lg shadow-lg" 
          />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Resources and Support
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            There are many resources available to support mental health. Here are some helpful links:
          </p>
          <ul className="list-disc list-inside mb-4 text-blue-600">
            <li><a href="https://www.nami.org/" target="_blank" rel="noopener noreferrer">National Alliance on Mental Illness (NAMI)</a></li>
            <li><a href="https://www.mentalhealth.gov/" target="_blank" rel="noopener noreferrer">MentalHealth.gov</a></li>
            <li><a href="https://www.suicidepreventionlifeline.org/" target="_blank" rel="noopener noreferrer">Suicide & Crisis Lifeline</a></li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Mentalhealth;
