from rest_framework import fields, serializers
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from backend.models import Evacuees, Municipality, Barangay, Evacuation, Calamity, Item, Inventory, StockedIn, Repacked, Distributed, CashDonation

# from rest_framework import serializers
from backend.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=None, use_url=True, required=False,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])]
    )

    class Meta:
        model = CustomUser
        fields = ('id', 'password', 'is_superuser', 'username', 'first_name', 'last_name',
                  'email', 'is_staff', 'municipality', 'barangay', 'position', 'contact_number', 'image')


class EvacueesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evacuees
        fields = ('id',
                  'last_name',
                  'first_name',
                  'middle_name',
                  'municipality',
                  'barangay',
                  'contact_num',
                  'gender',
                  'birthday',
                  'civil_status',
                  'occupation',
                  'resident_status',
                  'is_pwd',
                  'is_ip',
                  'is_head',
                  'household_num')


class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipality
        fields = ('id', 'name', 'province')


class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = ('id', 'name', 'municipality')


class EvacuationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evacuation
        fields = ('id', 'name', 'municipality', 'barangay', 'capacity')


class CalamitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Calamity
        fields = ('id', 'name', 'date')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'unit')


class InventorySerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all())
    unit = serializers.SerializerMethodField()

    class Meta:
        model = Inventory
        fields = ('id', 'item', 'unit', 'qty')

    def get_unit(self, obj):
        return obj.item.unit


class StockedInSerializer(serializers.ModelSerializer):
    item = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all())
    unit = serializers.SerializerMethodField()

    class Meta:
        model = StockedIn
        fields = ('id', 'givenBy', 'donor', 'dateReceived',
                  'item', 'unit', 'qty')

    def get_unit(self, obj):
        return obj.item.unit


class RepackedSerializer(serializers.ModelSerializer):
    item = InventorySerializer(read_only=True)
    unit = serializers.CharField(source='item.item.unit', read_only=True)
    qty = serializers.DecimalField(
        source='item.qty', max_digits=12, decimal_places=1, read_only=True)

    class Meta:
        model = Repacked
        fields = ('id', 'item', 'qty', 'unit', 'reason')


class DistributeReliefGoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distributed
        fields = ('id', 'calamity', 'calamityDate',
                  'dateDistributed', 'headFamily')


class CashDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashDonation
        fields = ('id', 'controlNumber', 'givenBy', 'donor',
                  'amount', 'modeOfTransfer', 'date')