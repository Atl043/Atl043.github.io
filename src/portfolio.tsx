import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
  Stack
} from '@mui/material';
import {
  Email,
  LinkedIn,
  GitHub,
  Work,
  School,
  CheckCircle,
  Code,
  Cloud,
  Storage,
  Web,
  Security,
  TrendingUp,
  AttachMoney
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0078d4', // Microsoft Blue
    },
    secondary: {
      main: '#005a9e',
    },
  },
  typography: {
    h1: {
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
  },
});

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud' | 'Data';
}

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const Portfolio: React.FC = () => {
  const skills: Skill[] = [
    // Frontend
    { name: 'React.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'HTML5/CSS', category: 'Frontend' },
    { name: 'React Redux', category: 'Frontend' },
    // Backend
    { name: 'C#/.NET', category: 'Backend' },
    { name: 'Java', category: 'Backend' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    // Cloud
    { name: 'Azure Portal', category: 'Cloud' },
    { name: 'ARM Templates', category: 'Cloud' },
    { name: 'Azure Synapse', category: 'Data' },
    { name: 'Azure Data Factory', category: 'Data' },
  ];

  const experiences: Experience[] = [
    {
      title: 'Software Engineer 2',
      company: 'Microsoft - C + AI Silver - Azure Gov Tooling',
      period: 'Nov 2021 - Present',
      location: 'Redmond, WA',
      description: 'Leading development of critical government compliance applications including Azure ConMon and Microsoft Personnel systems.',
      achievements: [
        'Led migration of legacy Azure ConMon (FedRAMP Continuous Monitoring) to modernized web application across multiple clouds',
        'Reduced monthly operational costs by $25,000+ through system modernization and optimization',
        'Streamlined POAM report preparation, cutting 120+ hours per month for U.S. government submissions',
        'Integrated M365 data reducing manual effort by 40+ hours per month',
        'Delivered ConMon Resiliency Feature reducing resolution time from 2 hours to 15 minutes',
        'Achieved 75% reduction in ICMS incidents for Microsoft Personnel application',
        'Optimized rendering performance reducing unnecessary re-renders by 95%'
      ],
      technologies: ['React.js', 'TypeScript', 'C#', 'Azure Synapse', 'Azure Data Factory', 'ARM Templates']
    },
    {
      title: 'Software Engineer 2',
      company: 'Northrop Grumman - Mission Systems',
      period: 'July 2020 - Oct 2021',
      location: 'San Diego, CA',
      description: 'Developed features for JP2008 SATCOM web application focusing on full-stack development and code quality.',
      achievements: [
        'Developed and delivered features for JP2008 SATCOM web application',
        'Built RESTful APIs for PostgreSQL database using .NET C#',
        'Optimized query performance with SQL views',
        'Established React.js/JavaScript style guide using VS Code and ESLint',
        'Created library of reusable UI components to enhance development efficiency'
      ],
      technologies: ['React.js', 'JavaScript', 'C#', 'PostgreSQL', '.NET', 'Visual Studio']
    },
    {
      title: 'Software Engineer 1',
      company: 'BAE Systems - Electronic Systems Sector',
      period: 'June 2019 - July 2020',
      location: 'San Diego, CA',
      description: 'Developed major features for MAFPS web application with focus on performance optimization and testing.',
      achievements: [
        'Developed major features for MAFPS (Mobility Air Forces Automated Flight Planning Service)',
        'Improved feature performance by ~10% through memory and performance analysis',
        'Increased test coverage from 68% to 83% using Enzyme unit tests',
        'Participated in Agile Kanban development and customer design meetings',
        'Integrated open-source components to accelerate development'
      ],
      technologies: ['React.js', 'JavaScript', 'React Redux', 'Enzyme', 'Jest']
    }
  ];

  const SkillProgress: React.FC<{ skill: Skill }> = ({ skill }) => (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" fontWeight="medium">
          {skill.name}
        </Typography>
      </Box>
    </Box>
  );

  const skillCategories = {
    'Frontend': skills.filter(s => s.category === 'Frontend'),
    'Backend': skills.filter(s => s.category === 'Backend'),
    'Cloud': skills.filter(s => s.category === 'Cloud'),
    'Data': skills.filter(s => s.category === 'Data'),
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Web />;
      case 'Backend': return <Code />;
      case 'Cloud': return <Cloud />;
      case 'Data': return <Storage />;
      default: return <Code />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters>
        {/* Header Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)', 
            color: 'white',
            py: 8
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Avatar
                  sx={{ 
                    width: 180, 
                    height: 180, 
                    mx: { xs: 'auto', md: 0 },
                    mb: 3,
                    border: '4px solid white',
                    bgcolor: 'rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="h2" fontWeight="bold">
                    AL
                  </Typography>
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Andrew Li
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ opacity: 0.9 }}>
                  Software Engineer 2
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ opacity: 0.8 }}>
                  Microsoft - C + AI Silver - Azure Gov Tooling
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.7, mb: 4 }}>
                  6+ Years Experience | Full-Stack Development | Azure Cloud
                </Typography>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Email />}
                    sx={{ color: 'white', borderColor: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                    size="large"
                  >
                    Contact
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    sx={{ color: 'white', borderColor: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                    size="large"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<GitHub />}
                    sx={{ color: 'white', borderColor: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                    size="large"
                  >
                    GitHub
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Paper>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} lg={4}>
              {/* Summary Section */}
              <Card sx={{ mb: 4, elevation: 3 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom color="primary">
                    Summary
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Software Engineer at Microsoft with 6 years of professional experience developing 
                    scalable Single Page Applications using React.js, building RESTful APIs with .NET (C#), 
                    and optimizing cloud deployments. Extensive experience in ELT pipelines, transforming 
                    trillions of records into actionable insights for monthly reports submitted to the U.S. government.
                  </Typography>
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card sx={{ mb: 4, elevation: 3 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom color="primary">
                    Technical Skills
                  </Typography>
                  
                  {Object.entries(skillCategories).map(([category, categorySkills]) => (
                    <Box key={category} sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {getCategoryIcon(category)}
                        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                          {category}
                        </Typography>
                      </Box>
                      {categorySkills.map((skill, index) => (
                        <SkillProgress key={index} skill={skill} />
                      ))}
                      {Object.keys(skillCategories).indexOf(category) < Object.keys(skillCategories).length - 1 && (
                        <Divider sx={{ mt: 2 }} />
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Education */}
              <Card sx={{ elevation: 3 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom color="primary">
                    Education
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', mt: 0.5 }}>
                      <School />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        B.S. Mathematics & Computer Science
                      </Typography>
                      <Typography variant="body1" color="primary">
                        University of California San Diego
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        La Jolla, CA • 2019
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} lg={8}>
              {/* ConMon Project Highlight */}
              <Card sx={{ mb: 4, elevation: 3 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom color="primary">
                    Azure ConMon Project Spotlight
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
                        <AttachMoney sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h3" fontWeight="bold">
                          $25K+
                        </Typography>
                        <Typography variant="body2">
                          Monthly Cost Reduction
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                        <Security sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h3" fontWeight="bold">
                          120+
                        </Typography>
                        <Typography variant="body2">
                          Hours Saved Monthly
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                        <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h3" fontWeight="bold">
                          95%
                        </Typography>
                        <Typography variant="body2">
                          Performance Improvement
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Led the complete migration of the legacy Azure ConMon (FedRAMP Continuous Monitoring) system 
                    to a modernized compliance web application. This critical government system processes trillions 
                    of records from 25+ data sources, streamlining U.S. government report submissions and enhancing 
                    security compliance across multiple Azure clouds.
                  </Typography>
                </CardContent>
              </Card>

              {/* Experience Section */}
              <Card sx={{ elevation: 3 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom color="primary">
                    Professional Experience
                  </Typography>
                  
                  {experiences.map((exp, index) => (
                    <Box key={index} sx={{ mb: index < experiences.length - 1 ? 6 : 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                        <Avatar sx={{ bgcolor: 'primary.light', mt: 0.5 }}>
                          <Work />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {exp.title}
                          </Typography>
                          <Typography variant="h6" color="primary" gutterBottom>
                            {exp.company}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {exp.location} • {exp.period}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                        {exp.description}
                      </Typography>
                      
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Key Achievements:
                      </Typography>
                      <List dense>
                        {exp.achievements.map((achievement, i) => (
                          <ListItem key={i} sx={{ pl: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                            </ListItemIcon>
                            <ListItemText primary={achievement} />
                          </ListItem>
                        ))}
                      </List>
                      
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                          Technologies:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {exp.technologies.map((tech) => (
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
                      
                      {index < experiences.length - 1 && <Divider sx={{ mt: 4 }} />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Portfolio;