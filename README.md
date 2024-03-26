# SAAS GPT Guide

Welcome to our SAAS GPT! This guide will walk you through the steps to fork and set up your own website with minimal changes. Our template is designed to be easy to use and customizable to suit your needs.

## Getting Started

### Step 1: Fork from Github
- Fork the SAAS GPT from our Github repository.
- Open the forked repository in your preferred Integrated Development Environment (IDE).

### Step 2: Setting up Credentials
- Visit [staging.questlabs.ai/login](https://staging.questlabs.ai/login) or directly production [app.questlabs.ai/login](https://app.questlabs.ai/login) and log in.
- Once logged in, access the admin panel where you'll find the settings option.
  
  ![image](https://github.com/Quest-Labs-INC/quest-dashboard-starter-template/assets/107596444/627b8efd-5c41-4b14-8c67-80b235265c26)

- In the settings page, navigate to the organization tab to find your `QUEST_ENTITY_NAME`, `QUEST_API_KEY`, and `QUEST_ENTITY_ID`.
- Copy these credentials and navigate to the forked folder where you'll find a file named `appConfig`.
- Paste the copied credentials into the `appConfig` file.

### Step 3: Setting up Theme

Configure all background color in index.css and colors in tailwind.config.js (add shades in customshade)

![image](https://github.com/Quest-Labs-INC/quest-dashboard-starter-template/assets/107596444/96f10840-abdc-415c-a8be-108b2bde6cea)

- login background: --primary-bg-color-1 ( left side )
- login background: --primary-bg-color-2 ( right side )
- dashboard background: --primary-bg-color-4
- sidebar background: --primary-bg-color-2

## Components Setup

### Login
#### Email Login
- No additional steps required for email login.

#### Google Login
- Create Google credentials. Follow our [documentation](https://docs.questlabs.ai/integrations/google-oauth) on how to create Google OAuth.
- Ensure the redirect URI is set to "http://localhost:3000/login/" for testing and change later.
- Copy the clientId and clientSecret from the Google Developer Portal.
- In the settings section of the admin panel, go to the integration tab and find Google.

  ![image](https://github.com/Quest-Labs-INC/quest-dashboard-starter-template/assets/107596444/01352d02-6871-437d-ac02-368d6a929a51)

- Click on connect and enter the clientId and clientSecret in the popup window. Save the changes.

  ![image](https://github.com/Quest-Labs-INC/quest-dashboard-starter-template/assets/107596444/4bc96f57-44b7-4b4e-be25-b4ac157cf6d3)

- Add the same `GOOGLE_CLIENT_ID` and `GOOGLE_REDIRECT_URI` to the `appConfig` file.

  ![image](https://github.com/Quest-Labs-INC/quest-dashboard-starter-template/assets/107596444/8fd56d4f-259b-4800-a86d-7d15886adcf2)


### Onboarding
- In the campaign section of the admin panel, click on Create Now or select an onboarding template.
- Customize the default questions or create your own.
- Publish the campaign.
- Click View Campaign to find the questId. Copy the questId.
- Paste the questId into the `QUEST_ONBOARDING_QUIZ_CAMPAIGN_ID` key in the `appConfig` file.

## You're All Set!
With these steps completed, your SAAS GPT is ready to use. Feel free to explore and customize further to create the perfect website for your needs. If you have any questions or need assistance, don't hesitate to reach out to our support team. Happy building!


