import { AppDataSource } from "../../../../data-source";
import bcrypt from "bcryptjs";
import { UserAdmin } from "../../../../modules/users/infra/typeorm/entify/UserAdmin";
import "dotenv/config";
async function createInitialData() {
  await AppDataSource.initialize();
  const userAdminRepository = AppDataSource.getRepository(UserAdmin);

  const existingAdmin = await userAdminRepository.findOne({
    where: { email: "admin@email123.com" },
  });

  if (existingAdmin) {
    console.log(`Usuário administrador ${existingAdmin.email} já existe.`);
    AppDataSource.destroy();
    return;
  }

  const hashedPassword = await bcrypt.hash(process.env.ADM_PASS, 10);
  const adminUser = userAdminRepository.create({
    email: "admin@email123.com",
    password: hashedPassword,
  });
  await userAdminRepository.save(adminUser);
  console.log("Usuário administrador criado com sucesso!");

  await AppDataSource.destroy();
}

createInitialData().catch((error) => {
  console.error("Erro ao criar dados iniciais:", error);
  process.exit(1);
});
