import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import {
  CheckCircle,
  Speed,
  AttachMoney,
  TrendingDown,
  Storage,
  People,
  SwapHoriz
} from '@mui/icons-material';

interface Project {
  title: string;
  description: string;
  timeline: string;
  impact: {
    metric: string;
    value: string;
    icon: React.ReactNode;
  }[];
  achievements: string[];
  technologies: string[];
}

const projects: Project[] = [
  {
    title: "Tech Lead - MTAC & ConMon Applications and Serving as Temp PM for ConMon",
    description: "Leading Two projects under C + AI Silver - Mission Apps. MTAC is a critical compliance application used by US Government to track and manage security compliance of Microsoft Cloud offerings. ConMon is a FedRAMP Continuous Monitoring application used by US Government to track and manage security compliance of Microsoft Cloud offerings for Azure and M365. Both applications process trillions of records from 25+ data sources for U.S. government submissions and have 6 different stakeholder teams to manage relationship with.",
    timeline: "April 2025 - Present",
    impact: [
      {
        metric: "Mentorship",
        value: "Grew Teammate's Velocity by 25%",
        icon: <People />
      },
      {
        metric: "Time Saved",
        value: "120+ hours/month by delivering high impact features",
        icon: <SwapHoriz />
      },
      {
        metric: "3 Jobs in 1",
        value: "Tech Lead, IC SWE, Product Manager",
        icon: <People />
      },
    ],
    achievements: [
        'Became the Tech Lead for 2 projects - both MTAC & ConMon applications under C + AI Silver - Mission Apps',
        'Serving as Temp Product Manager for ConMon project, coordinating between multiple teams and stakeholders to ensure timely delivery of features and bug fixes',
        'Tutored and mentored engineers on MTAC and ConMon teams, fostering skill development and knowledge sharing',
        'Worked with Stakeholders to swap out existing low impact features with new high impact features cutting 60+ hours per month',
        'Managed a full slate of features, balancing stakeholder priorities, timelines, and emergency requests, and security requirements',
        'Spearheading S360 Security Initiative on ConMon and MTAC',
        'Spearheading Cline AI Initiative on Mission Apps',
        'Serving as Temp Product Manager for ConMon project, coordinating between multiple teams and stakeholders to ensure timely delivery of features and bug fixes',
        'Onboarded Several High Impact Features automating a total estimated 120+ hours per month of manual work for stakeholders',
    ],
    technologies: ["React.js", "TypeScript", "Azure Synapse", "Azure Data Factory", "C#", ".NET", "Python", "ARM Templates", "Azure DevOps"]
  },
  {
    title: "ConMon Tech Lead - Delivering BaselineOS and PhysicalDB Assets Onboarding + Resiliency Feature + More",
    description: "Led the complete migration of legacy Azure ConMon (FedRAMP Continuous Monitoring) to a modernized compliance web application, processing trillions of records from 25+ data sources for U.S. government submissions.",
    timeline: "March 2024 - April 2025",
    impact: [
      {
        metric: "Time Saved",
        value: "120+ hours/month",
        icon: <Speed />
      },
      {
        metric: "Performance",
        value: "10+ Billion Additional Records Processed Daily",
        icon: <Storage />
      },
      {
        metric: "Reliability",
        value: "85% Decrease in Incidents",
        icon: <TrendingDown />
      },
    ],
    achievements: [
        'ConMon Tech Lead - managed a full slate of features, balancing stakeholder prioties, timelines, and emergency requests',
        'Onboarded Database and BaselineOS Assets onto ConMon Application, enhancing data comprehensiveness and saving 20+ hours per month',
        'Delivered ConMon Resiliency Feature reducing resolution time from 2 hours to 15 minutes and Achieved 85% reduction in ICMS incidents for ConMon Data Pipelines',
        'Led S360 Security Initiative on ConMon',
        'For specific emergency rollback stakeholder requests, I communicated mutliple solutions and tradeoffs, ultimately delivering a solution that satisfied all parties and fit our timeline',
        'Increased personal velocity by improving own processes and improved context switching, and learned how to use AI tools to improve productivity',
    ],
    technologies: ["React.js", "TypeScript", "Azure Synapse", "Azure Data Factory", "C#", ".NET", "Python", "ARM Templates", "Azure DevOps"]
  },
  {
    title: "M365 ConMon Onboarding",
    description: "Led the complete migration of legacy Azure ConMon (FedRAMP Continuous Monitoring) to a modernized compliance web application, processing trillions of records from 25+ data sources for U.S. government submissions.",
    timeline: "Jan 2024 - March 2024",
    impact: [
      {
        metric: "Cost Savings",
        value: "$10K+/month",
        icon: <AttachMoney />
      },
      {
        metric: "Time Saved",
        value: "40+ hours/month",
        icon: <Speed />
      }
    ],
    achievements: [
        'Integrated M365 data onto ConMon Application reducing manual effort by 40+ hours per month',
        'Identified and resolved critical data discrepancies between M365 and ConMon datasets, ensuring data integrity and reliability',
        'Collaborated with M365 teams to streamline data ingestion processes, enhancing overall system efficiency',
    ],
    technologies: ["React.js", "TypeScript", "Azure Synapse", "Azure Data Factory", "C#", ".NET", "Python", "ARM Templates", "Azure DevOps"]
  },
  {
    title: "Azure ConMon Modernization",
    description: "Led the complete migration of legacy Azure ConMon (FedRAMP Continuous Monitoring) to a modernized compliance web application, processing trillions of records from 25+ data sources for U.S. government submissions.",
    timeline: "May 2023 - Jan 2024",
    impact: [
      {
        metric: "Cost Savings",
        value: "$25K+/month",
        icon: <AttachMoney />
      },
      {
        metric: "Time Saved",
        value: "120+ hours/month",
        icon: <Speed />
      },
      {
        metric: "Performance",
        value: "2 Billion Records Processed Daily",
        icon: <Storage />
      },
      {
        metric: "Reliability",
        value: "90% Decrease in need for manual intervention compared to Legacy System",
        icon: <TrendingDown />
      },
      {
        metric: "Speed",
        value: "10hrs => 2.5hrs Pipeline RunTime",
        icon: <TrendingDown />
      },
    ],
    achievements: [
      'Led development of data pipelines and ETL processes using Azure Synapse to aggregate and process data from 25+ sources',
      'Created a Roadmap of required data processing and ingestion tasks to onboard Azure data onto ConMon Application',
      'Created over 100 dataflows and 30+ pipelines to automate data ingestion, transformation, and loading on a daily basis',
      'Mapped required inputs and outputs of several data processes to figure out how to create POA&Ms more efficiently',
      'Proposed and Delivered Independently effort to reduce overall pipeline runtime from 10hrs long to 2.5hrs in length'
    ],
    technologies: ["React.js", "TypeScript", "Azure Synapse", "Azure Data Factory", "C#", ".NET", "Python", "ARM Templates", "Azure DevOps"]
  },
  {
    title: "Microsoft Personnel Systems",
    description: "Enhanced and optimized critical personnel management systems for Microsoft's government sector, focusing on security compliance and performance improvements.",
    timeline: "November 2021 - May 2023",
    impact: [
    ],
    achievements: [
        'Optimized rendering performance reducing unnecessary re-renders by 95% for multiple personnel user interfaces',
        'Worked on the Personnel Project to deliver features for new dynamic Government Forms page',
        'Delivered Security Clearance Management features for Personnel application',
    ],
    technologies: ["React.js", "TypeScript", "C#", "Arm Templates", "Azure DevOps"]
  }
];

const MicrosoftTimeline: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Paper 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)',
          color: 'white',
          py: 6,
          px: 4,
          mb: 6,
          borderRadius: 2
        }}
      >
        <Typography variant="h2" gutterBottom>
          Microsoft Timeline + Projects
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Showcasing my key achievements and innovations at Microsoft November 2021 - Present
        </Typography>
      </Paper>

      {/* Projects */}
      {projects.map((project, index) => (
        <Card key={index} sx={{ mb: 4, elevation: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom color="primary">
              {project.title}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {project.timeline}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              {project.description}
            </Typography>

            {/* Impact Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {project.impact.map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      bgcolor: i === 0 ? 'success.light' : i === 1 ? 'primary.light' : 'secondary.light',
                      color: 'white'
                    }}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: 40, mb: 1 } })}
                    <Typography variant="h4" fontWeight="bold">
                      {item.value}
                    </Typography>
                    <Typography variant="body2">
                      {item.metric}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Achievements */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Key Achievements:
            </Typography>
            <List>
              {project.achievements.map((achievement, i) => (
                <ListItem key={i} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={achievement} />
                </ListItem>
              ))}
            </List>

            {/* Technologies */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Technologies Used:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {project.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default MicrosoftTimeline;
