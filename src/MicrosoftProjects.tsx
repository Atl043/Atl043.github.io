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
  AttachMoney
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
      }
    ],
    achievements: [
      "Migrated legacy system to modern web application across multiple clouds",
      "Streamlined POAM report preparation for U.S. government submissions",
      "Integrated M365 data reducing manual effort by 40+ hours monthly",
      "Implemented real-time data processing and validation"
    ],
    technologies: ["React.js", "TypeScript", "Azure Synapse", "Azure Data Factory", "C#", ".NET"]
  },
  {
    title: "Microsoft Personnel Systems",
    description: "Enhanced and optimized critical personnel management systems for Microsoft's government sector, focusing on security compliance and performance improvements.",
    impact: [
      {
        metric: "Incident Reduction",
        value: "75%",
        icon: <Security />
      },
      {
        metric: "System Uptime",
        value: "99.99%",
        icon: <CloudQueue />
      },
      {
        metric: "Response Time",
        value: "87% faster",
        icon: <Speed />
      }
    ],
    achievements: [
      "Achieved 75% reduction in ICMS incidents",
      "Implemented automated security compliance checks",
      "Optimized rendering performance reducing unnecessary re-renders",
      "Developed real-time monitoring dashboard"
    ],
    technologies: ["React.js", "TypeScript", "C#", "Azure Services", "Redux", "Material UI"]
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
