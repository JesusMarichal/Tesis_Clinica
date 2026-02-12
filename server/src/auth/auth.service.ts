import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // Mock User
    private readonly mockUser = {
        id: 1,
        email: 'admin@test.com',
        name: 'Admin Clinica',
        password: '', // Will be hashed admin123
    };

    constructor(private readonly jwtService: JwtService) {
        this.mockUser.password = bcrypt.hashSync('admin123', 10);
    }

    async login(email: string, pass: string) {
        if (email !== this.mockUser.email) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(pass, this.mockUser.password);
        if (!isMatch) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: this.mockUser.id, email: this.mockUser.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: this.mockUser.id,
                email: this.mockUser.email,
                name: this.mockUser.name,
            },
        };
    }
}
