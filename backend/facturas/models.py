from django.db import models
from productos.models import Producto
from django.contrib.auth.models import User



class Factura(models.Model):
    vendedor = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    productos = models.ManyToManyField(Producto, through='ProductosComprados', related_name="productos")
    # Otros campos de la factura

    def __str__(self):
        return f"Factura #{self.id}"


class ProductosComprados(models.Model):
    id = models.AutoField(primary_key=True)
    factura = models.ForeignKey(
        Factura, on_delete=models.CASCADE, null=False, blank=True
    )
    producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="producto",
    )
    cantidad = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.producto.name} #{self.cantidad}"