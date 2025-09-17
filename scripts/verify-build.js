#!/usr/bin/env node

/**
 * Build verification script for Next.js Assignment 2
 * Checks for common build issues before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build configuration...\n');

// Check for common import issues
const checkImports = () => {
  console.log('📦 Checking import paths...');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const issues = [];
  
  const checkFile = (filePath) => {
    if (fs.statSync(filePath).isDirectory()) {
      const files = fs.readdirSync(filePath);
      files.forEach(file => {
        checkFile(path.join(filePath, file));
      });
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for problematic @/ imports in Components directory
      if (filePath.includes('/Components/') && content.includes('@/Components/')) {
        issues.push({
          file: filePath,
          issue: 'Uses @/Components/ import instead of relative path',
          line: content.split('\n').findIndex(line => line.includes('@/Components/')) + 1
        });
      }
      
      // Check for missing imports
      if (content.includes('Navbar') && !content.includes('import') && !content.includes('from')) {
        issues.push({
          file: filePath,
          issue: 'Uses Navbar but no import found',
          line: content.split('\n').findIndex(line => line.includes('Navbar')) + 1
        });
      }
    }
  };
  
  checkFile(srcDir);
  
  if (issues.length > 0) {
    console.log('❌ Import issues found:');
    issues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line} - ${issue.issue}`);
    });
    return false;
  } else {
    console.log('✅ All import paths look good');
    return true;
  }
};

// Check package.json scripts
const checkScripts = () => {
  console.log('📋 Checking package.json scripts...');
  
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredScripts = ['dev', 'build', 'start', 'test'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    console.log('❌ Missing required scripts:', missingScripts.join(', '));
    return false;
  } else {
    console.log('✅ All required scripts present');
    return true;
  }
};

// Check for required files
const checkRequiredFiles = () => {
  console.log('📁 Checking required files...');
  
  const requiredFiles = [
    'next.config.js',
    'tsconfig.json',
    'tailwind.config.js',
    'package.json',
    'src/app/layout.tsx',
    'src/app/page.tsx'
  ];
  
  const missingFiles = requiredFiles.filter(file => {
    const filePath = path.join(__dirname, '..', file);
    return !fs.existsSync(filePath);
  });
  
  if (missingFiles.length > 0) {
    console.log('❌ Missing required files:', missingFiles.join(', '));
    return false;
  } else {
    console.log('✅ All required files present');
    return true;
  }
};

// Main verification
const main = () => {
  const checks = [
    checkImports,
    checkScripts,
    checkRequiredFiles
  ];
  
  const results = checks.map(check => check());
  const allPassed = results.every(result => result);
  
  console.log('\n' + '='.repeat(50));
  
  if (allPassed) {
    console.log('🎉 All checks passed! Build should work correctly.');
    console.log('✅ Ready for deployment to Vercel');
  } else {
    console.log('❌ Some checks failed. Please fix the issues above.');
    console.log('🔧 Run this script again after fixing the issues.');
    process.exit(1);
  }
};

main();
