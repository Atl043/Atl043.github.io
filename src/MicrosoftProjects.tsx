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
  Security,
  Speed,
  CloudQueue,
  TrendingUp,
  AttachMoney,
  TrendingDown
} from '@mui/icons-material';

interface Project {
  title: string;
  description: string;
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
    title: "Azure ConMon Modernization",
    description: "Led the complete migration of legacy Azure ConMon (FedRAMP Continuous Monitoring) to a modernized compliance web application, processing trillions of records from 25+ data sources for U.S. government submissions.",
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
        value: "95% improvement",
        icon: <TrendingUp />
      },
      {
        metric: "Reliability",
        value: "85% Decrease in Incidents",
        icon: <TrendingDown />
      },
    ],
    achievements: [
      'Tutored and mentored engineers on MTAC and ConMon teams, fostering skill development and knowledge sharing',
        'Integrated M365 data onto ConMon Application reducing manual effort by 40+ hours per month',
        'Onboarded Database and BaselineOS Assets onto ConMon Application, enhancing data comprehensiveness and saving 40+ hours per month',
        'Worked with Stakeholders to create high impact features streamlining POAM report preparation and cutting 60+ hours per month',
        'Delivered ConMon Resiliency Feature reducing resolution time from 2 hours to 15 minutes and Achieved 85% reduction in ICMS incidents for ConMon Data Pipelines',
        'Spearheading S360 Security Initiative on ConMon',
        'Spearheading Cline AI Initiative on Mission Apps'
    ],
    technologies: ["React.js", "TypeScript", "Azure Synapse", "Azure Data Factory", "C#", ".NET", "Python", "ARM Templates", "Azure DevOps"]
  },
  {
    title: "Microsoft Personnel Systems",
    description: "Enhanced and optimized critical personnel management systems for Microsoft's government sector, focusing on security compliance and performance improvements.",
    impact: [
    ],
    achievements: [
       'Led migration of legacy Azure ConMon (FedRAMP Continuous Monitoring) to modernized web application across multiple clouds',
        'Reduced monthly operational costs by $25,000+ through system modernization and optimization',
        'Streamlined POAM report preparation, cutting 120+ hours per month for U.S. government submissions',
        'Optimized rendering performance reducing unnecessary re-renders by 95%',
        'Worked on Personnel Project to build internal Microsoft employee management system for government contractors',
        'Delivered Features for Government Dynamic Forms and Security Clearance Management'
    ],
    technologies: ["React.js", "TypeScript", "C#", "Arm Templates", "Azure DevOps"]
  }
];

const MicrosoftProjects: React.FC = () => {
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
          Microsoft Projects
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Showcasing key achievements and innovations at Microsoft's C + AI Silver - Azure Gov Tooling
        </Typography>
      </Paper>

      {/* Projects */}
      {projects.map((project, index) => (
        <Card key={index} sx={{ mb: 4, elevation: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom color="primary">
              {project.title}
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

export default MicrosoftProjects;
