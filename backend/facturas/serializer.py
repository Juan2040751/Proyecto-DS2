from rest_framework import serializers
from .models import Factura, ProductosComprados
from productos.serializers import ProductoSerializer
from productos.models import Producto
import json


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ("id", "name")


class ProductosCompradosSerializer(serializers.ModelSerializer):
    producto = ProductSerializer(many=False, read_only=True)

    class Meta:
        model = ProductosComprados
        fields = ["cantidad", "producto"]
    def get_queryset(self):
        print(self.data.get(factura))
        #user = self.request.user
        return ProductosComprados.objects.filter(factura=self.data.get(factura))


class FacturaSerializer(serializers.ModelSerializer):
    productos = serializers.SerializerMethodField()

    class Meta:
        model = Factura
        fields = ["vendedor", "fecha", "productos", "id"]

    def get_productos(self, object):
        return ProductosComprados.objects.filter(factura=object).values()