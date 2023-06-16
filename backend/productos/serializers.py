from rest_framework import serializers
from .models import *

class ProductoSerializer(serializers.ModelSerializer):
    stock = serializers.SerializerMethodField()
    class Meta:
        model = Producto
        fields = ('id','name','description', 'price', 'manufacturer', 'weight', 'category', 'numberUnits', 'stock')
    def get_stock(self, obj):
        if obj.numberUnits == 0:
            return "Sin Stock"
        elif obj.numberUnits < 100:
            return "Stock bajo"
        elif obj.numberUnits > 100:
            return "Stock alto"


