import * as fs from 'fs';
import * as path from 'path';

console.log('--- 🔍 INICIANDO DIAGNÓSTICO DO PROJETO ---');

const checkFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    console.log(`✅ Arquivo encontrado: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('DATABASE_URL') || content.includes('datasource')) {
      console.log(`   📝 Contém referências ao Banco de Dados.`);
    }
  } else {
    console.error(`❌ ARQUIVO NÃO ENCONTRADO: ${filePath}`);
  }
};

// Checando arquivos críticos
checkFile('.env');
checkFile('prisma/schema.prisma');
checkFile('prisma.config.ts');
checkFile('src/prisma/prisma.service.ts');
checkFile('src/prisma/prisma.module.ts');
checkFile('src/app.module.ts');
checkFile('src/main.ts');

console.log('\n--- ⚙️ VERSÕES INSTALADAS ---');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`NestJS: ${pkg.dependencies['@nestjs/core']}`);
  console.log(`Prisma: ${pkg.devDependencies['prisma'] || pkg.dependencies['prisma']}`);
  console.log(`Config: ${pkg.dependencies['@nestjs/config'] ? 'Instalado' : 'NÃO INSTALADO'}`);
} catch (e) {
  console.error('Erro ao ler package.json');
}

console.log('\n--- 🚀 PRÓXIMOS PASSOS ---');
console.log('1. Rode: npx prisma validate');
console.log('2. Rode: npx prisma generate');