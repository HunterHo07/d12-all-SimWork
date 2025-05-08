export const quests = {
  developer: [
    {
      title: "Debug the API Integration",
      description: "The frontend is failing to connect to our API. Find and fix the issue in the code below.",
      task: "// Fix the API call function\nconst fetchData = async () => {\n  try {\n    const response = await fetch('api/data');\n    return response.json();\n  } catchy(error) { // <-- Bug here\n    console.log(error);\n    return [];\n  }\n}",
      solution: "catch(error)",
      type: "code",
      difficulty: 2,
      timeLimit: 300
    },
    {
      title: "Optimize the Rendering Algorithm",
      description: "Our app is rendering too slowly. Improve the performance of this function.",
      task: "// Optimize this function\nfunction renderList(items) {\n  let result = '';\n  for (let i = 0; i < items.length; i++) {\n    result += '<div>' + items[i].name + '</div>';\n  }\n  document.getElementById('list').innerHTML = result;\n}",
      solution: "const fragment = document.createDocumentFragment();\nitems.forEach(item => {\n  const div = document.createElement('div');\n  div.textContent = item.name;\n  fragment.appendChild(div);\n});\ndocument.getElementById('list').appendChild(fragment);",
      type: "code",
      difficulty: 3,
      timeLimit: 420
    }
  ],
  designer: [
    {
      title: "Create a Responsive Header",
      description: "Design a responsive header that works on mobile and desktop.",
      task: "Create a header with logo, navigation, and a mobile menu button.",
      solution: "",
      type: "design",
      difficulty: 2,
      timeLimit: 600
    },
    {
      title: "Design a Call-to-Action Button",
      description: "We need an eye-catching CTA button for our landing page.",
      task: "Design a button with hover and active states that converts well.",
      solution: "",
      type: "design",
      difficulty: 1,
      timeLimit: 300
    }
  ],
  data: [
    {
      title: "Clean the Customer Dataset",
      description: "Our customer data has inconsistencies. Clean it up for analysis.",
      task: "Fix the missing values and standardize the format of phone numbers.",
      solution: "",
      type: "data",
      difficulty: 3,
      timeLimit: 480
    },
    {
      title: "Generate Monthly Sales Report",
      description: "The executives need a sales performance report for the last quarter.",
      task: "Aggregate the sales data by region and compare to previous quarter.",
      solution: "",
      type: "data",
      difficulty: 4,
      timeLimit: 600
    }
  ],
  "project-manager": [
    {
      title: "Sprint Planning",
      description: "Plan the next two-week sprint for the development team.",
      task: "Prioritize features and assign tasks to team members.",
      solution: "",
      type: "management",
      difficulty: 3,
      timeLimit: 720
    },
    {
      title: "Risk Assessment",
      description: "Identify potential risks for the upcoming product launch.",
      task: "Document risks, their likelihood, impact, and mitigation strategies.",
      solution: "",
      type: "management",
      difficulty: 4,
      timeLimit: 540
    }
  ],
  "ai-engineer": [
    {
      title: "Debug the Recommendation Algorithm",
      description: "Our product recommendations aren't relevant to users. Fix the algorithm.",
      task: "Identify why the recommendation engine is suggesting irrelevant products.",
      solution: "",
      type: "ai",
      difficulty: 5,
      timeLimit: 900
    },
    {
      title: "Optimize Model Training Pipeline",
      description: "Our model training is taking too long. Optimize the pipeline.",
      task: "Reduce model training time while maintaining accuracy.",
      solution: "",
      type: "ai",
      difficulty: 4,
      timeLimit: 720
    }
  ]
};
