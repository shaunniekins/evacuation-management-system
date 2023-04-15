from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import CustomUser, Evacuees, Municipality, Barangay, Evacuation, Calamity, Item, Inventory, StockedIn, Repacked, Distributed, CashDonation

# Register your models here.

# admin.site.register(Permission)
admin.site.register(CustomUser)

models_list = [Evacuees, Municipality, Barangay, Evacuation, Calamity,
               Item, Inventory, StockedIn, Repacked, Distributed, CashDonation]
admin.site.register(models_list)
