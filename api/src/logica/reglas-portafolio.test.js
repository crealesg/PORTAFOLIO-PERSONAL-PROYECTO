import { describe, it, expect } from 'vitest';
import { validarMensaje, resumirProyectos } from './reglas-portafolio';

describe('validarMensaje', () => {
  it('acepta un mensaje con datos válidos', () => {
    const res = validarMensaje({
      nombre: 'Carlos',
      correo: 'carlos@ejemplo.com',
      texto: 'Hola, quiero contactarte por un proyecto.'
    });
    expect(res.valido).toBe(true);
    expect(res.error).toBeNull();
  });

  it('acepta un mensaje con exactamente 10 caracteres (caso límite)', () => {
    const res = validarMensaje({
      nombre: 'Ana',
      correo: 'ana@cuc.edu.co',
      texto: '1234567890'
    });
    expect(res.valido).toBe(true);
  });

  it('rechaza un mensaje de 9 caracteres (debajo del mínimo)', () => {
    const res = validarMensaje({
      nombre: 'Ana',
      correo: 'ana@cuc.edu.co',
      texto: '123456789'
    });
    expect(res.valido).toBe(false);
  });

  it('rechaza un correo sin formato válido', () => {
    const res = validarMensaje({
      nombre: 'Carlos',
      correo: 'correo-invalido',
      texto: 'Este es un mensaje suficientemente largo.'
    });
    expect(res.valido).toBe(false);
  });

  it('rechaza cuando faltan campos obligatorios', () => {
    const res = validarMensaje({ nombre: 'Carlos' });
    expect(res.valido).toBe(false);
  });
});

describe('resumirProyectos', () => {
  it('devuelve total 0 y lista vacía si no hay proyectos (caso límite)', () => {
    expect(resumirProyectos([])).toEqual({ total: 0, tecnologias: [] });
  });

  it('cuenta proyectos y elimina tecnologías duplicadas', () => {
    const lista = [
      { id: 1, tecnologias: ['React', 'Node'] },
      { id: 2, tecnologias: ['Node', 'CSS'] }
    ];
    expect(resumirProyectos(lista)).toEqual({
      total: 2,
      tecnologias: ['React', 'Node', 'CSS']
    });
  });
});
